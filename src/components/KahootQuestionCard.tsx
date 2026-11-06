import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, Flame } from 'lucide-react';
import { Question, KahootOption } from '../types/game';
import { sound } from '../utils/audio';

interface KahootQuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  timeLimitSec: number;
  score: number;
  streak: number;
  onAnswerSelected: (selectedOption: KahootOption, timeSpentSec: number) => void;
  onTimeExpired: () => void;
}

export const KahootQuestionCard: React.FC<KahootQuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  timeLimitSec,
  score,
  streak,
  onAnswerSelected,
  onTimeExpired,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(timeLimitSec > 0 ? timeLimitSec : 999);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelectOption = useCallback(
    (option: KahootOption) => {
      if (selectedOptId) return; // Prevent double click
      setSelectedOptId(option.id);
      sound.playClick();
      const timeSpent = Math.max(1, (Date.now() - startTimeRef.current) / 1000);
      onAnswerSelected(option, timeSpent);
    },
    [selectedOptId, onAnswerSelected]
  );

  // Reset timer on question change
  useEffect(() => {
    startTimeRef.current = Date.now();
    setSelectedOptId(null);

    const initialTime = timeLimitSec > 0 ? timeLimitSec : 999;
    setTimeLeft(initialTime);

    if (timeLimitSec <= 0) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          onTimeExpired();
          return 0;
        }

        // Play tick sound
        if (prev <= 6) {
          sound.playUrgentTick();
        } else if (prev % 2 === 0) {
          sound.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.id, timeLimitSec, onTimeExpired]);

  // Keyboard shortcut listener (A, B, C, D and 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedOptId) return;

      const keyUpper = e.key ? e.key.toUpperCase() : '';
      const codeUpper = e.code ? e.code.toUpperCase() : '';

      const keyMap: Record<string, number> = {
        'A': 0, '1': 0,
        'B': 1, '2': 1,
        'C': 2, '3': 2,
        'D': 3, '4': 3,
      };

      let targetIndex: number | undefined = keyMap[keyUpper];
      if (targetIndex === undefined) {
        if (codeUpper === 'KEYA' || codeUpper === 'DIGIT1' || codeUpper === 'NUMPAD1') targetIndex = 0;
        else if (codeUpper === 'KEYB' || codeUpper === 'DIGIT2' || codeUpper === 'NUMPAD2') targetIndex = 1;
        else if (codeUpper === 'KEYC' || codeUpper === 'DIGIT3' || codeUpper === 'NUMPAD3') targetIndex = 2;
        else if (codeUpper === 'KEYD' || codeUpper === 'DIGIT4' || codeUpper === 'NUMPAD4') targetIndex = 3;
      }

      if (targetIndex !== undefined) {
        const targetOpt = question.options[targetIndex];
        if (targetOpt) {
          e.preventDefault();
          handleSelectOption(targetOpt);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question.options, selectedOptId, handleSelectOption]);

  const speakPrompt = () => {
    sound.speakItalian(question.prompt);
  };

  // Timer circle geometry
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = timeLimitSec > 0 ? timeLeft / timeLimitSec : 1;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const isUrgent = timeLimitSec > 0 && timeLeft <= 5;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 py-2 px-4 sm:px-6">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#171339]/90 border border-indigo-900/60 rounded-2xl px-5 py-3 shadow-lg">
        {/* Question Counter */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Progresso
            </span>
            <span className="font-display font-extrabold text-lg text-white">
              {currentIndex + 1} <span className="text-slate-500 text-sm font-normal">/ {totalQuestions}</span>
            </span>
          </div>

          <div className="w-24 sm:w-36 h-2 bg-indigo-950 rounded-full overflow-hidden ml-2 border border-indigo-900/40">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-amber-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Center: Countdown Timer Ring (if timed) */}
        {timeLimitSec > 0 ? (
          <div className="relative flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="text-indigo-950 stroke-current"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className={`stroke-current transition-all duration-1000 ${
                  isUrgent ? 'text-rose-500' : timeLeft <= 10 ? 'text-amber-400' : 'text-violet-400'
                }`}
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div
              className={`absolute font-display font-black text-xl tabular-nums ${
                isUrgent ? 'text-rose-400 animate-pulse' : 'text-white'
              }`}
            >
              {timeLeft}
            </div>
          </div>
        ) : (
          <div className="text-xs font-semibold px-3 py-1 bg-indigo-950/80 border border-indigo-800 text-slate-300 rounded-lg">
            Zen Mode (Untimed)
          </div>
        )}

        {/* Score & Streak */}
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-950/80 to-orange-950/80 border border-amber-500/40 rounded-xl px-3 py-1">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-orange-300">Streak</div>
                <div className="font-display font-black text-sm text-amber-300 tabular-nums">
                  {streak}x
                </div>
              </div>
            </div>
          )}

          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Punti
            </div>
            <div className="font-display font-black text-lg text-amber-400 tabular-nums">
              {score.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Question Display Box */}
      <div className="relative bg-gradient-to-b from-[#1b1642] to-[#141033] border-2 border-indigo-700/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-center text-center min-h-[170px]">
        {/* Sub-prompt / Category badge / Difficulty & Tense badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          {question.subPrompt && (
            <div className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-semibold tracking-wide">
              {question.subPrompt}
            </div>
          )}
          {question.difficulty && (
            <div
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                question.difficulty === 'beginner'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : question.difficulty === 'intermediate'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              {question.difficulty === 'beginner'
                ? '🌱 初级 (Beginner)'
                : question.difficulty === 'intermediate'
                ? '⚡ 中级 (Intermediate)'
                : '🔥 高级 (Advanced)'}
            </div>
          )}
          {question.tense && (
            <div className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold">
              {question.tense === 'passato_prossimo' ? 'Passato Prossimo (近过去时)' : question.tense}
            </div>
          )}
        </div>

        {/* Question sentence/prompt */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-relaxed max-w-3xl">
          {question.prompt}
        </h2>

        {/* Italian Voice Speaker Button */}
        <button
          onClick={speakPrompt}
          title="Ascolta la pronuncia italiana (Listen to Italian pronunciation)"
          className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/60 hover:bg-indigo-800 text-amber-300 hover:text-white border border-indigo-600/50 text-xs font-bold transition-all shadow-md group cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Ascolta Pronuncia (TTS)</span>
        </button>
      </div>

      {/* Kahoot 4 Iconic Answers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full">
        {question.options.map((option, idx) => {
          // Kahoot shape styles & colors
          const colorStyles: Record<KahootOption['color'], { bg: string; border: string; hover: string }> = {
            red: {
              bg: 'bg-[#e21b3c]',
              border: 'border-b-4 border-[#a31027]',
              hover: 'hover:bg-[#f02b4c]',
            },
            blue: {
              bg: 'bg-[#1368ce]',
              border: 'border-b-4 border-[#0c4c99]',
              hover: 'hover:bg-[#1f77e2]',
            },
            yellow: {
              bg: 'bg-[#d89e00]',
              border: 'border-b-4 border-[#9c7200]',
              hover: 'hover:bg-[#ebb008]',
            },
            green: {
              bg: 'bg-[#26890c]',
              border: 'border-b-4 border-[#195e07]',
              hover: 'hover:bg-[#2fa310]',
            },
          };

          const shapeIcons: Record<KahootOption['shape'], React.ReactNode> = {
            triangle: (
              <span className="text-xl sm:text-2xl leading-none font-bold" aria-hidden="true">
                ▲
              </span>
            ),
            diamond: (
              <span className="text-xl sm:text-2xl leading-none font-bold" aria-hidden="true">
                ◆
              </span>
            ),
            circle: (
              <span className="text-xl sm:text-2xl leading-none font-bold" aria-hidden="true">
                ●
              </span>
            ),
            square: (
              <span className="text-xl sm:text-2xl leading-none font-bold" aria-hidden="true">
                ■
              </span>
            ),
          };

          const styling = colorStyles[option.color];
          const isSelected = selectedOptId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option)}
              disabled={selectedOptId !== null}
              className={`relative btn-kahoot flex items-center justify-between p-4 sm:p-5 rounded-2xl min-h-[82px] text-left transition-all ${
                styling.bg
              } ${styling.border} ${styling.hover} text-white shadow-lg cursor-pointer ${
                isSelected ? 'ring-4 ring-white scale-[0.98]' : ''
              } ${selectedOptId && !isSelected ? 'opacity-70' : ''}`}
            >
              {/* Shape Icon */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-3">
                <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0 text-white">
                  {shapeIcons[option.shape]}
                </div>
                <span className="font-display font-extrabold text-base sm:text-lg md:text-xl leading-snug break-words line-clamp-2 sm:line-clamp-3">
                  {option.text}
                </span>
              </div>

              {/* Keyboard Shortcut badge (A/1, B/2, C/3, D/4) */}
              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <div className="px-2.5 py-1 rounded-xl bg-black/30 flex items-center justify-center border border-white/25 shadow-inner">
                  <span className="font-display font-black text-sm text-amber-300">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span className="text-[11px] text-white/60 ml-1 font-mono">
                    /{idx + 1}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard Hint footer */}
      <div className="text-center text-xs text-slate-400 font-medium pt-1 flex items-center justify-center flex-wrap gap-1.5">
        <span>快捷提示：直接按键盘</span>
        <kbd className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-amber-300 font-bold text-xs shadow-sm">
          A
        </kbd>
        <kbd className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-amber-300 font-bold text-xs shadow-sm">
          B
        </kbd>
        <kbd className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-amber-300 font-bold text-xs shadow-sm">
          C
        </kbd>
        <kbd className="px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-amber-300 font-bold text-xs shadow-sm">
          D
        </kbd>
        <span>或数字键</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-slate-300 text-xs">
          1
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-slate-300 text-xs">
          2
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-slate-300 text-xs">
          3
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/60 font-mono text-slate-300 text-xs">
          4
        </kbd>
        <span>均可秒选答案</span>
      </div>
    </div>
  );
};
