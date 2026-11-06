import React from 'react';
import { Flame, Trophy, Calendar, CheckCircle2, Circle, Sparkles, X, ArrowRight, Zap } from 'lucide-react';
import { DailyStreakData } from '../types/game';
import { getStreakMilestone, getRecentWeekProgress } from '../utils/streak';
import { sound } from '../utils/audio';

interface DailyStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakData: DailyStreakData;
  onStartQuiz: () => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  isOpen,
  onClose,
  streakData,
  onStartQuiz,
}) => {
  if (!isOpen) return null;

  const milestone = getStreakMilestone(streakData.currentStreak);
  const weekProgress = getRecentWeekProgress(streakData.completedDates);

  const daysToNext = milestone.nextMilestone ? milestone.nextMilestone - streakData.currentStreak : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-gradient-to-b from-[#21164e] to-[#120c2d] border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-950/80 animate-pulse">
              <Flame className="w-11 h-11 text-indigo-950 fill-amber-300" />
            </div>
            {streakData.todayCompleted && (
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-[#21164e]">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold font-display">
              {milestone.icon} {milestone.badgeIt}
            </span>
            <span className="text-xs text-slate-400 font-medium">{milestone.badgeZh}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mt-1">
            {streakData.currentStreak}{' '}
            <span className="text-amber-400">
              {streakData.currentStreak === 1 ? 'Giorno di Fila' : 'Giorni di Fila'}
            </span>
          </h2>
          <p className="text-xs text-slate-300 max-w-md mt-1.5 leading-relaxed">
            {milestone.message}
          </p>

          {/* Today status indicator pill */}
          <div className="mt-3.5">
            {streakData.todayCompleted ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Oggi Completato! 今日打卡已达成，连胜稳步前行！</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Oggi in Attesa! 今天还未做题，快来完成 1 局测验续上连胜！</span>
              </div>
            )}
          </div>
        </div>

        {/* 7-Day Rolling Calendar Strip */}
        <div className="bg-indigo-950/70 border border-indigo-800/60 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>近 7 天打卡记录 (Ultimi 7 Giorni)</span>
            </div>
            <span className="text-[11px] text-slate-400">完成任意测验即自动打卡</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {weekProgress.map((day) => (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center justify-between p-2 rounded-xl border text-center transition-all ${
                  day.isCompleted
                    ? 'bg-gradient-to-b from-orange-600/30 to-amber-600/20 border-orange-500/50 text-white shadow-sm'
                    : day.isToday
                    ? 'bg-indigo-900/60 border-amber-400/70 text-slate-200 ring-2 ring-amber-400/40'
                    : 'bg-indigo-950/40 border-indigo-900/30 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-semibold text-slate-400 block">{day.dayShort}</span>
                <span className="text-[9px] text-slate-400 block mb-1">{day.dayZh}</span>

                <div className="my-1">
                  {day.isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md">
                      <Flame className="w-4 h-4 text-indigo-950 fill-white" />
                    </div>
                  ) : day.isToday ? (
                    <div className="w-7 h-7 rounded-full border-2 border-dashed border-amber-400/80 flex items-center justify-center text-amber-400 text-xs font-bold animate-pulse">
                      ⏳
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border border-indigo-800/60 flex items-center justify-center text-slate-600 text-xs">
                      <Circle className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <span
                  className={`text-[10px] font-mono mt-1 ${
                    day.isToday ? 'font-bold text-amber-400' : 'text-slate-400'
                  }`}
                >
                  {day.dateStr.slice(8)}日
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Progress Bar */}
        {milestone.nextMilestone && daysToNext !== null && (
          <div className="bg-indigo-950/50 border border-indigo-800/40 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>距离下一个成就阶段:</span>
              </span>
              <span className="font-bold text-amber-400 font-mono">
                还需 {daysToNext} 天 (目标 {milestone.nextMilestone} 天)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-indigo-900/60 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((streakData.currentStreak / milestone.nextMilestone) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-900/50 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold mb-0.5">
              当前连胜
            </span>
            <span className="font-display font-black text-2xl text-amber-400 tabular-nums">
              {streakData.currentStreak}
            </span>
            <span className="text-[10px] text-slate-400 block">Giorni</span>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-900/50 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold mb-0.5">
              最佳连胜纪录
            </span>
            <span className="font-display font-black text-2xl text-purple-400 tabular-nums">
              {streakData.longestStreak}
            </span>
            <span className="text-[10px] text-slate-400 block">Record</span>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-900/50 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold mb-0.5">
              累计完成测验
            </span>
            <span className="font-display font-black text-2xl text-emerald-400 tabular-nums">
              {streakData.totalQuizzesCompleted}
            </span>
            <span className="text-[10px] text-slate-400 block">Quiz Totali</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
          >
            Chiudi (关闭)
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onStartQuiz();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-indigo-950 font-display font-black text-sm shadow-lg shadow-orange-950/60 cursor-pointer"
          >
            <span>Subito al Quiz! (马上开始测验)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
