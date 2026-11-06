import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Flame, RotateCcw, BookOpen, CheckCircle, XCircle, ArrowRight, Volume2 } from 'lucide-react';
import { UserAnswerRecord, DailyStreakData } from '../types/game';
import { sound } from '../utils/audio';

interface KahootPodiumProps {
  score: number;
  answers: UserAnswerRecord[];
  onPlayAgain: () => void;
  onRetryMistakes: () => void;
  onOpenDictionary: () => void;
  dailyStreakData: DailyStreakData;
  isFirstStreakToday: boolean;
  onOpenStreakModal: () => void;
}

export const KahootPodium: React.FC<KahootPodiumProps> = ({
  score,
  answers,
  onPlayAgain,
  onRetryMistakes,
  onOpenDictionary,
  dailyStreakData,
  isFirstStreakToday,
  onOpenStreakModal,
}) => {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalCount = answers.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const incorrectAnswers = answers.filter((a) => !a.isCorrect);

  useEffect(() => {
    sound.playVictory();

    // Trigger confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);
    } catch {
      // ignore
    }
  }, []);

  // Press Enter on Podium to play again
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isEnter =
        e.key === 'Enter' ||
        e.code === 'Enter' ||
        e.code === 'NumpadEnter' ||
        e.keyCode === 13;
      if (isEnter) {
        e.preventDefault();
        sound.playClick();
        onPlayAgain();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayAgain]);

  const getRankTitle = () => {
    if (accuracy === 100) return { title: 'Maestro Assoluto dei Verbi!', badge: '100% 完美满分 🏆' };
    if (accuracy >= 80) return { title: 'Campione Italiano Eccellente!', badge: '优秀意大利语学者 ⭐' };
    if (accuracy >= 60) return { title: 'Bravo! Ottimo Lavoro!', badge: '进步飞速 踏实掌握 👍' };
    return { title: 'Continua così! La pratica rende perfetti.', badge: '熟能生巧 继续加油 💪' };
  };

  const rank = getRankTitle();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 py-6 px-4 sm:px-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Victory Banner */}
      <div className="text-center flex flex-col items-center bg-gradient-to-b from-[#251759] to-[#160e3b] border-2 border-indigo-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-950/80 mb-4 animate-bounce">
            <Trophy className="w-10 h-10 text-indigo-950" />
          </div>

          <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-2">
            {rank.badge}
          </span>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            {rank.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display font-black text-5xl sm:text-6xl text-amber-400 tabular-nums">
              {score.toLocaleString()}
            </span>
            <span className="text-slate-400 font-semibold text-lg">Punti Kahoot</span>
          </div>

          {/* Quick Stat Pill Trio */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 w-full max-w-lg">
            <div className="bg-indigo-950/70 border border-indigo-800/60 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1">
                Precisione (正确率)
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">
                {accuracy}%
              </span>
            </div>

            <div className="bg-indigo-950/70 border border-indigo-800/60 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1">
                Risposte Esatte
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-white tabular-nums">
                {correctCount} <span className="text-sm font-normal text-slate-400">/ {totalCount}</span>
              </span>
            </div>

            <div className="bg-indigo-950/70 border border-indigo-800/60 rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1">
                Errori (错题)
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-rose-400 tabular-nums">
                {incorrectAnswers.length}
              </span>
            </div>
          </div>

          {/* Daily Streak Completed Celebration Banner */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenStreakModal();
            }}
            className={`w-full max-w-lg mt-6 p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 text-left ${
              isFirstStreakToday
                ? 'bg-gradient-to-r from-orange-600/35 via-amber-600/30 to-yellow-600/25 border-orange-400 shadow-xl shadow-orange-950/60 ring-2 ring-orange-400/40 animate-pulse'
                : 'bg-indigo-950/70 border-indigo-800/60 hover:border-amber-400/70'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-950 shrink-0">
                <Flame className="w-7 h-7 text-indigo-950 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm sm:text-base text-amber-300">
                    {isFirstStreakToday ? '🎉 今日打卡达成！Daily Streak +1' : '🔥 Daily Streak 连胜持续中'}
                  </span>
                  {isFirstStreakToday && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      今日首胜
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  你已连续 <strong className="text-white font-mono text-sm">{dailyStreakData.currentStreak}</strong> 天完成做题！最高纪录 {dailyStreakData.longestStreak} 天。
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-amber-400">
              <span className="hidden sm:inline">打卡日历</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            <button
              onClick={() => {
                sound.playClick();
                onPlayAgain();
              }}
              className="btn-kahoot inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-indigo-950 font-display font-black text-base shadow-lg shadow-amber-950 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nuovo Quiz (再来一局)</span>
            </button>

            {incorrectAnswers.length > 0 && (
              <button
                onClick={() => {
                  sound.playClick();
                  onRetryMistakes();
                }}
                className="btn-kahoot inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-display font-black text-base shadow-lg shadow-rose-950 cursor-pointer"
              >
                <Flame className="w-5 h-5" />
                <span>Rifai Solo gli Errori ({incorrectAnswers.length} 错题专练)</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onOpenDictionary();
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-900/80 hover:bg-indigo-800 text-white font-display font-bold text-base border border-indigo-700/60 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Sfoglia Verbi (笔记词库)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-display font-black text-white flex items-center justify-between">
          <span>Riepilogo Domande (答题情况复盘)</span>
          <span className="text-xs text-slate-400 font-normal">点击小喇叭可试听意大利语发音</span>
        </h2>

        <div className="flex flex-col gap-3">
          {answers.map((record, idx) => (
            <div
              key={record.questionId}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                record.isCorrect
                  ? 'bg-[#151f28]/80 border-emerald-900/40'
                  : 'bg-[#291420]/80 border-rose-900/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 shrink-0">
                    {record.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-semibold">
                      Domanda {idx + 1}
                    </span>
                    <span className="font-display font-bold text-base text-white mt-0.5">
                      {record.question.prompt}
                    </span>

                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                      <span className="text-slate-400">Risposta esatta:</span>
                      <span className="font-bold text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60">
                        {record.question.correctAnswerText}
                      </span>
                      {record.question.explanation.sentenceMeaning && (
                        <span className="text-slate-400">
                          ({record.question.explanation.sentenceMeaning})
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-slate-300 leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/5">
                      💡 {record.question.explanation.rule}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => sound.speakItalian(record.question.correctAnswerText)}
                  title="Ascolta"
                  className="p-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-amber-300 border border-indigo-800/60 shrink-0 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
