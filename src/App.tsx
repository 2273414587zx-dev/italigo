import React, { useState, useEffect, useCallback } from 'react';
import { GameStage, GameSettings, Question, KahootOption, UserAnswerRecord, VerbCategory, QuizCategoryFilter, DailyStreakData } from './types/game';
import { getQuizQuestions } from './data/questions';
import { Navbar } from './components/Navbar';
import { KahootLobby } from './components/KahootLobby';
import { KahootQuestionCard } from './components/KahootQuestionCard';
import { KahootFeedbackModal } from './components/KahootFeedbackModal';
import { KahootPodium } from './components/KahootPodium';
import { VerbExplorer } from './components/VerbExplorerModal';
import { GrammarRuleGuide } from './components/GrammarRuleGuide';
import { FamilyGuide } from './components/FamilyGuide';
import { VocabGuideModal } from './components/VocabGuideModal';
import { DailyStreakModal } from './components/DailyStreakModal';
import { getDailyStreakData, recordDailyQuizCompletion } from './utils/streak';
import { sound } from './utils/audio';

export default function App() {
  const [stage, setStage] = useState<GameStage>('lobby');
  const [settings, setSettings] = useState<GameSettings>({
    category: 'notebook_sentences',
    difficulty: 'all',
    questionCount: 10,
    timeLimitSec: 20,
    soundEnabled: true,
    musicEnabled: false,
    autoAdvance: false,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswerRecord[]>([]);

  // Current question response state for feedback
  const [currentSelectedOption, setCurrentSelectedOption] = useState<KahootOption | null>(null);
  const [currentIsCorrect, setCurrentIsCorrect] = useState<boolean>(false);
  const [currentPointsEarned, setCurrentPointsEarned] = useState<number>(0);

  // Mistake bank storage
  const [mistakeDeck, setMistakeDeck] = useState<Question[]>([]);

  // Sound & Music setup on first user click
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  // Daily Streak gamification state
  const [dailyStreakData, setDailyStreakData] = useState<DailyStreakData>(getDailyStreakData);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isFirstStreakToday, setIsFirstStreakToday] = useState(false);

  useEffect(() => {
    setDailyStreakData(getDailyStreakData());
    const handleStreakSync = () => {
      setDailyStreakData(getDailyStreakData());
    };
    window.addEventListener('kahoot_streak_updated', handleStreakSync);
    return () => window.removeEventListener('kahoot_streak_updated', handleStreakSync);
  }, []);

  const startQuizWithQuestions = (quizQuestions: Question[]) => {
    if (quizQuestions.length === 0) return;
    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setAnswers([]);
    setCurrentSelectedOption(null);
    setStage('playing');

    if (musicEnabled) {
      sound.startThinkingMusic();
    }
  };

  const handleStartGame = () => {
    const generated = getQuizQuestions(settings.category, settings.questionCount, settings.difficulty);
    startQuizWithQuestions(generated);
  };

  const handleStartCategoryQuiz = (cat: VerbCategory) => {
    setSettings((prev) => ({ ...prev, category: cat as unknown as GameSettings['category'] }));
    const generated = getQuizQuestions(cat as unknown as GameSettings['category'], 10, settings.difficulty);
    startQuizWithQuestions(generated);
  };

  const handleStartFamilyQuiz = () => {
    setSettings((prev) => ({ ...prev, category: 'family' }));
    const generated = getQuizQuestions('family', 16, settings.difficulty);
    startQuizWithQuestions(generated);
  };

  const handleStartVocabQuiz = (category: QuizCategoryFilter) => {
    setSettings((prev) => ({ ...prev, category }));
    const generated = getQuizQuestions(category, settings.questionCount, settings.difficulty);
    startQuizWithQuestions(generated);
  };

  const handleAnswerSelected = (selectedOption: KahootOption, timeSpentSec: number) => {
    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption.isCorrect;

    // Kahoot Speed Scoring Formula
    let points = 0;
    let nextStreak = streak;

    if (isCorrect) {
      nextStreak = streak + 1;
      const limit = settings.timeLimitSec > 0 ? settings.timeLimitSec : 20;
      const speedFactor = Math.max(0.2, 1 - (timeSpentSec / (limit * 1.5)));
      const basePoints = Math.round(speedFactor * 1000);
      const streakBonus = Math.min(nextStreak, 5) * 100;
      points = basePoints + streakBonus;
    } else {
      nextStreak = 0;
      // Add to mistake deck if not already present
      setMistakeDeck((prev) => {
        if (!prev.some((q) => q.id === currentQ.id)) {
          return [...prev, currentQ];
        }
        return prev;
      });
    }

    setStreak(nextStreak);
    setScore((prev) => prev + points);

    setCurrentSelectedOption(selectedOption);
    setCurrentIsCorrect(isCorrect);
    setCurrentPointsEarned(points);

    const record: UserAnswerRecord = {
      questionId: currentQ.id,
      question: currentQ,
      selectedOptionId: selectedOption.id,
      isCorrect,
      timeSpentSec,
      pointsEarned: points,
    };
    setAnswers((prev) => [...prev, record]);

    sound.stopMusic();
    setStage('feedback');
  };

  const handleTimeExpired = useCallback(() => {
    const currentQ = questions[currentIndex];
    setStreak(0);
    setCurrentSelectedOption(null);
    setCurrentIsCorrect(false);
    setCurrentPointsEarned(0);

    setMistakeDeck((prev) => {
      if (!prev.some((q) => q.id === currentQ.id)) {
        return [...prev, currentQ];
      }
      return prev;
    });

    const record: UserAnswerRecord = {
      questionId: currentQ.id,
      question: currentQ,
      selectedOptionId: '',
      isCorrect: false,
      timeSpentSec: settings.timeLimitSec,
      pointsEarned: 0,
    };
    setAnswers((prev) => [...prev, record]);

    sound.stopMusic();
    setStage('feedback');
  }, [questions, currentIndex, settings.timeLimitSec]);

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSelectedOption(null);
      setStage('playing');
      if (musicEnabled) {
        sound.startThinkingMusic();
      }
    } else {
      // Quiz completed! Advance daily streak tracker
      const streakResult = recordDailyQuizCompletion();
      setDailyStreakData(streakResult.data);
      setIsFirstStreakToday(streakResult.isFirstToday);
      if (streakResult.streakIncreased) {
        setTimeout(() => {
          sound.playStreakChime();
        }, 1100);
      }
      setStage('podium');
    }
  };

  const handleRetryMistakes = () => {
    if (mistakeDeck.length === 0) return;
    startQuizWithQuestions([...mistakeDeck]);
  };

  return (
    <div className="min-h-screen bg-[#0c0a1d] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-indigo-950 font-sans">
      {/* Universal Top Bar */}
      <Navbar
        stage={stage}
        setStage={setStage}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        score={score}
        streak={streak}
        dailyStreakData={dailyStreakData}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
      />

      {/* Main Gameplay Screen Body */}
      <main className="flex-1 flex flex-col justify-center items-center w-full">
        {stage === 'lobby' && (
          <KahootLobby
            settings={settings}
            setSettings={setSettings}
            onStartGame={handleStartGame}
            onOpenDictionary={() => setStage('dictionary')}
            onOpenGrammarGuide={() => setStage('grammar_guide')}
            onOpenFamilyGuide={() => setStage('family_guide')}
            onOpenVocabGuide={() => setStage('vocab_guide')}
            hasMistakes={mistakeDeck.length > 0}
            onReviewMistakes={handleRetryMistakes}
            dailyStreakData={dailyStreakData}
            onOpenStreakModal={() => setIsStreakModalOpen(true)}
          />
        )}

        {stage === 'playing' && questions[currentIndex] && (
          <KahootQuestionCard
            key={questions[currentIndex].id}
            question={questions[currentIndex]}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            timeLimitSec={settings.timeLimitSec}
            score={score}
            streak={streak}
            onAnswerSelected={handleAnswerSelected}
            onTimeExpired={handleTimeExpired}
          />
        )}

        {stage === 'feedback' && questions[currentIndex] && (
          <KahootFeedbackModal
            question={questions[currentIndex]}
            selectedOption={currentSelectedOption}
            isCorrect={currentIsCorrect}
            pointsEarned={currentPointsEarned}
            streak={streak}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {stage === 'podium' && (
          <KahootPodium
            score={score}
            answers={answers}
            onPlayAgain={() => setStage('lobby')}
            onRetryMistakes={handleRetryMistakes}
            onOpenDictionary={() => setStage('dictionary')}
            dailyStreakData={dailyStreakData}
            isFirstStreakToday={isFirstStreakToday}
            onOpenStreakModal={() => setIsStreakModalOpen(true)}
          />
        )}

        {stage === 'dictionary' && (
          <VerbExplorer
            onStartCategoryQuiz={handleStartCategoryQuiz}
            onBackToLobby={() => setStage('lobby')}
          />
        )}

        {stage === 'grammar_guide' && (
          <GrammarRuleGuide
            onBackToLobby={() => setStage('lobby')}
            onStartQuiz={() => {
              setStage('lobby');
              handleStartGame();
            }}
          />
        )}

        {stage === 'family_guide' && (
          <FamilyGuide
            onBackToLobby={() => setStage('lobby')}
            onStartFamilyQuiz={handleStartFamilyQuiz}
          />
        )}

        {stage === 'vocab_guide' && (
          <VocabGuideModal
            onBackToLobby={() => setStage('lobby')}
            onStartVocabQuiz={handleStartVocabQuiz}
          />
        )}
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="w-full border-t border-indigo-950/60 py-4 px-6 text-center text-xs text-slate-500">
        Kahoot! Italiano · Verbi in -are, -ere, -ire &amp; -isc- · Web Audio FX &amp; Italian Speech TTS
      </footer>

      {/* Daily Streak Modal */}
      <DailyStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakData={dailyStreakData}
        onStartQuiz={() => {
          setIsStreakModalOpen(false);
          setStage('lobby');
          handleStartGame();
        }}
      />
    </div>
  );
}
