import React from 'react';
import { Volume2, VolumeX, Music, BookOpen, GraduationCap, Play, Sparkles } from 'lucide-react';
import { GameStage, DailyStreakData } from '../types/game';
import { sound } from '../utils/audio';

interface NavbarProps {
  stage: GameStage;
  setStage: (stage: GameStage) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
  score: number;
  streak: number;
  dailyStreakData: DailyStreakData;
  onOpenStreakModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stage,
  setStage,
  soundEnabled,
  setSoundEnabled,
  musicEnabled,
  setMusicEnabled,
  score,
  streak,
  dailyStreakData,
  onOpenStreakModal,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setMuted(!next);
    if (next) sound.playClick();
  };

  const toggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    sound.setMusicMuted(!next);
    if (next && stage === 'playing') {
      sound.startThinkingMusic();
    } else {
      sound.stopMusic();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#120e2e]/95 backdrop-blur-md border-b border-indigo-950/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            setStage('lobby');
          }}
          className="flex items-center gap-2 group text-left cursor-pointer shrink-0"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-amber-500 shadow-md shadow-indigo-950">
            <span className="text-white font-display font-black text-xl tracking-tighter">K!</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Kahoot!
              </span>
              <span className="font-display font-extrabold text-base text-emerald-400 tracking-tight">
                Italiano
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => {
              sound.playClick();
              setStage('lobby');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              stage === 'lobby' || stage === 'playing' || stage === 'feedback' || stage === 'podium'
                ? 'text-white border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Quiz Arena</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setStage('dictionary');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              stage === 'dictionary'
                ? 'text-white border-b-2 border-emerald-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Notebook Verbi (45+)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setStage('grammar_guide');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              stage === 'grammar_guide'
                ? 'text-white border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>-ARE / -ERE / -IRE 秘籍</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setStage('family_guide');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              stage === 'family_guide'
                ? 'text-white border-b-2 border-pink-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>👨‍👩‍👧‍👦 La Famiglia (亲属关系)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setStage('vocab_guide');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              stage === 'vocab_guide'
                ? 'text-white border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>📚 核心词汇宝典</span>
          </button>
        </nav>

        {/* Zone 3: Daily Streak / Live Score / Audio Controls / Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Daily Streak Indicator Badge */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStreakModal();
            }}
            title={`Daily Streak: ${dailyStreakData.currentStreak} ${
              dailyStreakData.currentStreak === 1 ? 'giorno' : 'giorni'
            } consecutive! 点击查看打卡日历与成就`}
            className={`group flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              dailyStreakData.todayCompleted
                ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/20 border-orange-500/50 hover:border-orange-400 text-amber-300 shadow-sm shadow-orange-950/40'
                : 'bg-indigo-950/70 border-indigo-800/60 hover:border-amber-400/80 text-slate-300 hover:text-white'
            }`}
          >
            <span className="text-sm sm:text-base leading-none select-none">🔥</span>
            <span className="font-display font-black text-xs sm:text-sm tracking-tight text-white group-hover:text-amber-400 tabular-nums">
              {dailyStreakData.currentStreak}
            </span>
            <span className="text-[10px] font-bold text-slate-400 hidden xl:inline">
              {dailyStreakData.currentStreak === 1 ? 'Giorno' : 'Giorni'}
            </span>
            {dailyStreakData.todayCompleted ? (
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80"
                title="今日已打卡"
              />
            ) : (
              <span
                className="w-2 h-2 rounded-full bg-amber-400/80 animate-ping"
                title="今日待打卡"
              />
            )}
          </button>

          {stage === 'playing' && (
            <div className="hidden sm:flex items-center gap-3 bg-indigo-950/70 border border-indigo-800/60 rounded-xl px-3 py-1.5">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Score</div>
                <div className="font-display font-extrabold text-sm text-amber-400 tabular-nums">
                  {score.toLocaleString()}
                </div>
              </div>
              {streak > 1 && (
                <div className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-950/60 border border-orange-500/30 rounded-lg px-2 py-0.5">
                  <span>🔥</span>
                  <span>{streak}x</span>
                </div>
              )}
            </div>
          )}

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className={`p-2 rounded-xl transition-all ${
              soundEnabled
                ? 'bg-indigo-900/60 hover:bg-indigo-800/80 text-emerald-400 border border-indigo-700/50'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-500 border border-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            title={musicEnabled ? 'Stop Background Music' : 'Start Background Music'}
            className={`p-2 rounded-xl transition-all ${
              musicEnabled
                ? 'bg-amber-950/60 hover:bg-amber-900/70 text-amber-400 border border-amber-600/40'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-500 border border-slate-800'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {stage !== 'lobby' && (
            <button
              onClick={() => {
                sound.playClick();
                setStage('lobby');
              }}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-950 transition-all whitespace-nowrap shrink-0"
            >
              Nuovo Quiz
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
