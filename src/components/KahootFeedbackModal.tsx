import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Volume2, Flame, Award, Lightbulb } from 'lucide-react';
import { Question, KahootOption } from '../types/game';
import { sound } from '../utils/audio';

interface KahootFeedbackModalProps {
  question: Question;
  selectedOption: KahootOption | null;
  isCorrect: boolean;
  pointsEarned: number;
  streak: number;
  currentIndex: number;
  totalQuestions: number;
  onNextQuestion: () => void;
}

export const KahootFeedbackModal: React.FC<KahootFeedbackModalProps> = ({
  question,
  selectedOption,
  isCorrect,
  pointsEarned,
  streak,
  currentIndex,
  totalQuestions,
  onNextQuestion,
}) => {
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Play sound on mount, auto-read the correct answer aloud, and auto-focus the next button
  useEffect(() => {
    if (isCorrect) {
      sound.playCorrect();
      if (streak > 2) {
        setTimeout(() => sound.playStreak(), 400);
      }
    } else {
      sound.playIncorrect();
    }

    // Automatically speak the Italian answer aloud after brief chime
    const speechTimer = setTimeout(() => {
      sound.speakItalian(
        question.correctAnswerText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }, 260);

    // Auto-focus the next button so keyboard users can immediately press Enter or Space
    const focusTimer = setTimeout(() => {
      nextBtnRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(speechTimer);
      clearTimeout(focusTimer);
    };
  }, [isCorrect, streak, question.correctAnswerText]);

  // Global keydown listener for Enter, NumpadEnter, and Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isEnter =
        e.key === 'Enter' ||
        e.code === 'Enter' ||
        e.code === 'NumpadEnter' ||
        e.keyCode === 13;

      const isSpace = e.key === ' ' || e.code === 'Space' || e.keyCode === 32;

      if (isEnter || isSpace) {
        e.preventDefault();
        e.stopPropagation();
        sound.playClick();
        onNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onNextQuestion]);

  const speakAnswer = () => {
    sound.speakItalian(
      question.correctAnswerText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const fullSentence = question.prompt.includes('_____')
    ? question.prompt.replace('_____', question.correctAnswerText)
    : '';

  const speakFullSentence = () => {
    if (!fullSentence) return;
    sound.speakItalian(
      fullSentence,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const isLastQuestion = currentIndex + 1 >= totalQuestions;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-4 px-4 sm:px-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Top Kahoot Result Banner */}
      <div
        className={`w-full rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl relative overflow-hidden ${
          isCorrect
            ? 'bg-gradient-to-b from-[#26890c] to-[#175c07] border-2 border-emerald-400/50'
            : 'bg-gradient-to-b from-[#e21b3c] to-[#990c23] border-2 border-rose-400/50'
        }`}
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Status Icon */}
          <div className="mb-2">
            {isCorrect ? (
              <CheckCircle2 className="w-16 h-16 text-emerald-100 drop-shadow-md animate-bounce" />
            ) : (
              <XCircle className="w-16 h-16 text-rose-100 drop-shadow-md" />
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
            {isCorrect ? 'BRAVISSIMO! 答对了！' : selectedOption ? 'SBAGLIATO! 答错了！' : 'TEMPO SCADUTO! 时间到！'}
          </h2>

          {/* Points & Streak Gain */}
          {isCorrect && (
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 bg-black/25 px-4 py-1.5 rounded-full border border-white/20">
                <Award className="w-5 h-5 text-amber-300" />
                <span className="font-display font-black text-xl text-amber-300">
                  +{pointsEarned} Punti
                </span>
              </div>

              {streak > 1 && (
                <div className="flex items-center gap-1.5 bg-orange-950/80 px-3.5 py-1.5 rounded-full border border-orange-400/40 text-orange-200 font-bold text-sm">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Streak: {streak} in fila! 🔥</span>
                </div>
              )}
            </div>
          )}

          {/* Correct Answer Display with Auto-Speech Feedback */}
          <div className="mt-4 bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:px-6 sm:py-3.5 border border-white/20 max-w-xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="text-left w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-white/70">
                  Risposta Esatta (正确答案)
                </span>
                {isSpeaking && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 animate-pulse bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                    <Volume2 className="w-3 h-3" />
                    <span>正在发音...</span>
                  </span>
                )}
              </div>
              <span className="text-2xl sm:text-3xl font-display font-black text-white block mt-0.5">
                {question.correctAnswerText}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={speakAnswer}
                title="Ascolta la pronuncia della risposta (重播发音)"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer text-xs font-bold ${
                  isSpeaking
                    ? 'bg-amber-400 text-indigo-950 shadow-md ring-2 ring-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>重播发音</span>
              </button>

              {fullSentence && (
                <button
                  onClick={speakFullSentence}
                  title="Ascolta l'intera frase (朗读整句)"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 transition-all cursor-pointer text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>朗读整句</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Explanation & Notebook Reference Card */}
      <div className="bg-[#18133b] border border-indigo-900/60 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
        <div className="flex items-center gap-2.5 text-amber-400">
          <Lightbulb className="w-5 h-5 shrink-0" />
          <h3 className="font-display font-black text-lg text-white">
            {question.type === 'vocabulary'
              ? 'Spiegazione del Vocabolario (核心词汇详解)'
              : question.type === 'family_relation'
              ? 'Spiegazione della Parentela (亲属关系详解)'
              : 'Spiegazione Grammaticale (笔记语法详解)'}
          </h3>
        </div>

        {/* Rule Prose */}
        <div className="p-4 rounded-2xl bg-indigo-950/70 border border-indigo-800/50 text-slate-200 text-sm sm:text-base leading-relaxed">
          {question.explanation.rule}
        </div>

        {/* Sentence / Verb Translations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {question.explanation.verbTranslation && (
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-900/40">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-0.5">
                {question.type === 'vocabulary' ? 'Parola / Vocabolario' : question.type === 'family_relation' ? 'Parentela' : 'Verbo all\'infinito'}
              </span>
              <span className="text-emerald-300 font-bold">{question.explanation.verbTranslation}</span>
            </div>
          )}

          {question.explanation.sentenceMeaning && (
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-900/40">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-0.5">
                Significato della frase (句子翻译)
              </span>
              <span className="text-slate-200">{question.explanation.sentenceMeaning}</span>
            </div>
          )}
        </div>

        {/* Mini 6-Person Conjugation Table (if available) */}
        {question.explanation.conjugationTable && (
          <div className="mt-2">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-2">
              Tabella di Coniugazione Completa (完整六人称变位)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              {[
                { label: 'io', val: question.explanation.conjugationTable.io },
                { label: 'tu', val: question.explanation.conjugationTable.tu },
                { label: 'lui / lei', val: question.explanation.conjugationTable.lui_lei },
                { label: 'noi', val: question.explanation.conjugationTable.noi },
                { label: 'voi', val: question.explanation.conjugationTable.voi },
                { label: 'loro', val: question.explanation.conjugationTable.loro },
              ].map((item) => {
                const isTarget = item.val.toLowerCase() === question.correctAnswerText.toLowerCase();
                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border ${
                      isTarget
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 font-bold'
                        : 'bg-indigo-950/40 border-indigo-900/40 text-slate-300'
                    }`}
                  >
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="font-display font-semibold">{item.val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next Question CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>快捷提示：按键盘</span>
            <kbd className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-amber-300 font-bold text-xs inline-flex items-center gap-1 shadow-sm">
              Enter ↵
            </kbd>
            <span>或空格键即可快速切到下一题</span>
          </div>

          <button
            ref={nextBtnRef}
            onClick={() => {
              sound.playClick();
              onNextQuestion();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-display font-black text-lg shadow-xl shadow-indigo-950/60 transition-all hover:scale-[1.02] cursor-pointer focus:ring-4 focus:ring-violet-400 focus:outline-none"
          >
            <span>{isLastQuestion ? 'Vedi Risultati (查看总结)' : 'Prossima Domanda (下一题)'}</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/30 text-amber-300 text-xs font-mono border border-white/20">
              Enter ↵
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
