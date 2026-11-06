import React from 'react';
import { Play, Sparkles, BookOpen, Clock, Hash, Flame, GraduationCap, CheckCircle, Gauge } from 'lucide-react';
import { GameSettings, QuizCategoryFilter, DailyStreakData, DifficultyLevel } from '../types/game';
import { sound } from '../utils/audio';
import { getStreakMilestone, getRecentWeekProgress } from '../utils/streak';

interface KahootLobbyProps {
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  onStartGame: () => void;
  onOpenDictionary: () => void;
  onOpenGrammarGuide: () => void;
  onOpenFamilyGuide: () => void;
  onOpenVocabGuide: () => void;
  hasMistakes: boolean;
  onReviewMistakes: () => void;
  dailyStreakData: DailyStreakData;
  onOpenStreakModal: () => void;
}

export const KahootLobby: React.FC<KahootLobbyProps> = ({
  settings,
  setSettings,
  onStartGame,
  onOpenDictionary,
  onOpenGrammarGuide,
  onOpenFamilyGuide,
  onOpenVocabGuide,
  hasMistakes,
  onReviewMistakes,
  dailyStreakData,
  onOpenStreakModal,
}) => {
  const categoryOptions: Array<{
    id: QuizCategoryFilter;
    title: string;
    sub: string;
    countBadge: string;
    color: string;
    featured?: boolean;
  }> = [
    {
      id: 'notebook_possessivi',
      title: '👑 Gli Aggettivi Possessivi (物主形容词真题)',
      sub: 'il mio / la mia / i miei / le mie... 前面要有冠词 + 跟着名词变 + loro不变',
      countBadge: '18道物主真题',
      color: 'from-purple-600 via-pink-600 to-rose-600',
      featured: true,
    },
    {
      id: 'notebook_avere',
      title: '🔥 Verbo AVERE & Espressioni (动词 AVERE 与固定搭配)',
      sub: 'ho, hai, ha, abbiamo... + avere caldo/freddo/fame/sete/sonno/fretta/paura/ragione/torto',
      countBadge: '核心真题',
      color: 'from-rose-600 via-orange-600 to-amber-600',
      featured: true,
    },
    {
      id: 'notebook_mesi_date',
      title: '📅 Mesi, Stagioni & Date (月份四季与日期问答)',
      sub: '12个月份 + 四季 + il primo 法则 + 生日问答 (Quando è il tuo compleanno?)',
      countBadge: '真题特训',
      color: 'from-blue-600 to-cyan-600',
      featured: true,
    },
    {
      id: 'notebook_vocab',
      title: '📝 Quaderno Pag.6 (手写笔记专属新词)',
      sub: 'moschea, mi dispiace, lontana, maglietta, palazzo, chiesa, cassa, città, centro, cetriolo, scarpa...',
      countBadge: '16 手写新词',
      color: 'from-amber-500 to-rose-600',
      featured: true,
    },
    {
      id: 'vocab_all',
      title: '📚 Vocabolario Essenziale (核心词汇全面突破)',
      sub: '饮食、居家日常、必考反义词、城市出行综合测试',
      countBadge: '150+ 词汇题',
      color: 'from-amber-600 to-yellow-600',
      featured: true,
    },
    {
      id: 'vocab_cibo',
      title: '🍕 Cibo & Bevande (食物与日常饮食词汇)',
      sub: 'pane, pasta, formaggio, mela, caffè, latte, pizza, colazione...',
      countBadge: '饮食词汇',
      color: 'from-orange-600 to-amber-600',
      featured: true,
    },
    {
      id: 'vocab_contrari',
      title: '⚡ I Contrari (必考基础反义词对)',
      sub: 'caldo/freddo, grande/piccolo, bello/brutto, veloce/lento...',
      countBadge: '高频考点',
      color: 'from-yellow-600 to-lime-600',
      featured: true,
    },
    {
      id: 'family',
      title: '👨‍👩‍👧‍👦 La Famiglia (亲属关系全题库)',
      sub: 'Il fratello di mia madre è mio zio / nonna / nipoti / suoceri / cognati...',
      countBadge: '136+ 亲属题',
      color: 'from-pink-600 to-rose-600',
      featured: true,
    },
    {
      id: 'vocab_casa',
      title: '🏠 Casa & Oggetti (居家生活与常用物品)',
      sub: 'camera, cucina, bagno, tavolo, sedia, porta, chiave, penna...',
      countBadge: '日常物品',
      color: 'from-teal-600 to-cyan-600',
    },
    {
      id: 'vocab_citta',
      title: '🌆 Città & Professioni (城市地点与常见职业)',
      sub: 'stazione, aeroporto, piazza, medico, studente, cameriere...',
      countBadge: '城市职业',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'notebook_sentences',
      title: '📝 Esercizi del Foglio (课堂习题真题)',
      sub: '笔记第4页 Bridgewater / Giulia / BSU 真实造句填空',
      countBadge: '手写真题',
      color: 'from-amber-600 to-orange-600',
      featured: true,
    },
    {
      id: 'all',
      title: '🌟 Tutto il Quaderno (全笔记综合挑战)',
      sub: '动词三大变位 + -isc- + 亲属关系 + 核心词汇全面大乱斗',
      countBadge: '300+ 综合题',
      color: 'from-violet-600 to-indigo-600',
    },
    {
      id: 'are',
      title: '🔴 Verbi in -ARE (第一变位法)',
      sub: 'abitare, guidare, studiare, parlare, mangiare...',
      countBadge: '21 动词',
      color: 'from-rose-600 to-red-600',
    },
    {
      id: 'ere',
      title: '🔵 Verbi in -ERE (第二变位法)',
      sub: 'vedere, prendere, scrivere, chiudere, vivere...',
      countBadge: '12 动词',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'ire_all',
      title: '🟢 Verbi in -IRE (第三变位法全集)',
      sub: '普通规则 (-o, -i, -e) 与 -isc- 动词辨析',
      countBadge: '12 动词',
      color: 'from-emerald-600 to-teal-600',
    },
    {
      id: 'ire_isc',
      title: '⚡ -IRE Speciali (-ISC- 重点词)',
      sub: 'finire, capire, preferire, pulire, spedire',
      countBadge: '高频考点',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      id: 'ire_regular',
      title: '🌱 -IRE Regolari (普通无 -isc-)',
      sub: 'aprire, dormire, offrire, partire, seguire, sentire, servire',
      countBadge: '7 动词',
      color: 'from-emerald-700 to-green-800',
    },
  ];

  const questionCounts = [10, 20, 50, 100];
  const timerOptions = [
    { label: '15s 极速', val: 15 },
    { label: '20s 标准', val: 20 },
    { label: '30s 从容', val: 30 },
    { label: '不限时', val: 0 },
  ];

  const difficultyOptions: Array<{
    id: DifficultyLevel;
    label: string;
    sub: string;
    badge: string;
    color: string;
  }> = [
    {
      id: 'all',
      label: '🌟 全部难度 (Tutto)',
      sub: '全时态与动词大乱斗，全面覆盖',
      badge: '全覆盖',
      color: 'from-violet-600 to-indigo-600',
    },
    {
      id: 'beginner',
      label: '🌱 Principiante (初级)',
      sub: '规则现在时 (-are/-ere/-ire) · 核心代词 io/tu/noi · 基础词汇',
      badge: '现在时基础',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'intermediate',
      label: '⚡ Intermedio (中级)',
      sub: '-ISC- 特殊动词 · avere 场景短语 · 物主形容词修饰 · 规则过去分词',
      badge: '-ISC- 与搭配',
      color: 'from-amber-600 to-orange-600',
    },
    {
      id: 'advanced',
      label: '🔥 Avanzato (高级)',
      sub: '不规则过去分词 (scritto/preso/visto) · 近过去时复合时态 · loro不变陷阱',
      badge: '复合时态与陷阱',
      color: 'from-rose-600 to-red-700',
    },
  ];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isEnter =
        e.key === 'Enter' ||
        e.code === 'Enter' ||
        e.code === 'NumpadEnter' ||
        e.keyCode === 13;
      if (isEnter) {
        sound.playClick();
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-6 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#241952] via-[#1a1342] to-[#110c2c] border border-indigo-700/40 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>根据你的意大利语笔记本打造 · 互动音效 Kahoot 模式</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
              Italiano Kahoot!
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              即刻开启意语动词变位大挑战！掌握 <span className="text-rose-400 font-bold">-are</span>、
              <span className="text-blue-400 font-bold">-ere</span>、
              <span className="text-emerald-400 font-bold">-ire (普通规则)</span> 与{' '}
              <span className="text-amber-400 font-bold">-ire (-isc-)</span>，答对即刻计分、真实音效与母语语音朗读。
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenDictionary();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 text-xs font-bold transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>查看笔记45个动词库</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenGrammarGuide();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 text-xs font-bold transition-all cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>变位规则与口诀</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenFamilyGuide();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-950/80 hover:bg-pink-900 border border-pink-700/60 text-pink-200 text-xs font-bold transition-all cursor-pointer"
              >
                <span>👨‍👩‍👧‍👦 亲属关系秘籍</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenVocabGuide();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 text-amber-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>📚 核心词汇宝典</span>
              </button>

              {hasMistakes && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onReviewMistakes();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 text-rose-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>复习错题本</span>
                </button>
              )}
            </div>
          </div>

          {/* Big Start Kahoot Button */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onStartGame();
              }}
              className="btn-kahoot relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-display font-black text-2xl shadow-2xl shadow-orange-950 border-b-4 border-amber-700 cursor-pointer group"
            >
              <Play className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
              <span>START QUIZ!</span>
            </button>
            <span className="text-xs text-slate-400 font-medium">按回车键也可快速开始</span>
          </div>
        </div>
      </div>

      {/* Daily Streak Tracker Card */}
      <div
        onClick={() => {
          sound.playClick();
          onOpenStreakModal();
        }}
        className="group relative overflow-hidden bg-gradient-to-r from-[#2a1745] via-[#1f133d] to-[#160f33] border-2 border-orange-500/40 hover:border-orange-400/80 rounded-3xl p-5 sm:p-6 shadow-xl shadow-orange-950/20 transition-all cursor-pointer"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Left info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-950/60 group-hover:scale-105 transition-transform shrink-0">
              <Flame className="w-8 h-8 sm:w-9 sm:h-9 text-indigo-950 fill-amber-200" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[11px] font-bold">
                  Serie Giornaliera 每日连胜打卡
                </span>
                {dailyStreakData.todayCompleted ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    今日已打卡
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold flex items-center gap-1 animate-pulse">
                    <Clock className="w-3 h-3" />
                    今日待打卡
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                  {dailyStreakData.currentStreak}{' '}
                  <span className="text-amber-400 text-xl sm:text-2xl">
                    {dailyStreakData.currentStreak === 1 ? 'Giorno di Fila' : 'Giorni di Fila'}
                  </span>
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  (最高纪录: {dailyStreakData.longestStreak}天 · 累计做题: {dailyStreakData.totalQuizzesCompleted}套)
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-1">
                {dailyStreakData.todayCompleted
                  ? '太棒了！今天已完成测验，连胜之火熊熊燃烧！点击可查看打卡日历与成就。'
                  : '每天完成至少 1 套题即可累计连续打卡天数，开启你的意语持续学习之旅！'}
              </p>
            </div>
          </div>

          {/* Right week preview & button */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-indigo-900/60">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {getRecentWeekProgress(dailyStreakData.completedDates).map((day) => (
                <div
                  key={day.dateStr}
                  title={`${day.dateStr}: ${day.isCompleted ? '已完成打卡' : '未打卡'}`}
                  className={`flex flex-col items-center justify-center w-8 h-10 rounded-xl border text-[10px] ${
                    day.isCompleted
                      ? 'bg-orange-500/30 border-orange-400 text-amber-200'
                      : day.isToday
                      ? 'bg-indigo-900/60 border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
                      : 'bg-indigo-950/40 border-indigo-900/40 text-slate-500'
                  }`}
                >
                  <span className="text-[9px] font-bold leading-none">{day.dayShort[0]}</span>
                  <span className="mt-1 leading-none">{day.isCompleted ? '🔥' : day.isToday ? '⏳' : '·'}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onOpenStreakModal();
              }}
              className="px-3.5 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-amber-300 hover:text-white text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
            >
              打卡详情 ➔
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selection Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <span>1. 选择练习题库 (Categoria)</span>
          </h2>
          <span className="text-xs text-slate-400">点击选中你想专攻的题型</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {categoryOptions.map((cat) => {
            const isSelected = settings.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSettings((prev) => ({ ...prev, category: cat.id }));
                }}
                className={`flex items-start justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e1747] border-amber-400 shadow-lg shadow-indigo-950/70 ring-2 ring-amber-400/40'
                    : 'bg-[#151033] border-indigo-900/40 hover:bg-[#1a1440] hover:border-indigo-700/60'
                }`}
              >
                <div className="flex flex-col pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-white">{cat.title}</span>
                    {cat.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                        课堂笔记
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 line-clamp-1">{cat.sub}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-semibold text-slate-300 px-2 py-0.5 rounded-lg bg-indigo-950 border border-indigo-800">
                    {cat.countBadge}
                  </span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Difficulty Level Selector */}
      <div className="flex flex-col gap-3.5 bg-[#161138] border border-indigo-900/50 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="text-sm font-display font-bold text-slate-200 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>2. 难度与时态范围 (Livello di Difficoltà &amp; Tempi)</span>
          </label>
          <span className="text-xs text-slate-400">过滤动词变位复杂度、不规则变化与近过去时 (Passato Prossimo)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {difficultyOptions.map((diff) => {
            const isSelected = settings.difficulty === diff.id;
            return (
              <button
                key={diff.id}
                onClick={() => {
                  sound.playClick();
                  setSettings((prev) => ({ ...prev, difficulty: diff.id }));
                }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? `bg-gradient-to-br ${diff.color} border-amber-300 text-white shadow-lg ring-2 ring-amber-400/50`
                    : 'bg-indigo-950/60 border-indigo-900/40 text-slate-300 hover:bg-indigo-900/50 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-display font-bold text-sm tracking-tight">{diff.label}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-black/30 text-white' : 'bg-indigo-900 text-slate-400'
                      }`}
                    >
                      {diff.badge}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-snug ${isSelected ? 'text-slate-100' : 'text-slate-400'}`}>
                    {diff.sub}
                  </p>
                </div>
                {isSelected && (
                  <div className="mt-2 text-[10px] font-bold text-amber-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>已激活该难度筛选</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Options (Count & Timer) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#161138] border border-indigo-900/50 rounded-3xl p-6">
        {/* Question Count */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-display font-bold text-slate-200 flex items-center gap-2">
            <Hash className="w-4 h-4 text-violet-400" />
            <span>3. 题目数量 (Numero di Domande)</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {questionCounts.map((count) => {
              const active = settings.questionCount === count;
              return (
                <button
                  key={count}
                  onClick={() => {
                    sound.playClick();
                    setSettings((prev) => ({ ...prev, questionCount: count }));
                  }}
                  className={`py-2.5 rounded-xl font-display font-bold text-sm transition-all cursor-pointer ${
                    active
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-950'
                      : 'bg-indigo-950/60 text-slate-400 hover:text-white hover:bg-indigo-900/60 border border-indigo-900/40'
                  }`}
                >
                  {count} 题
                </button>
              );
            })}
          </div>
        </div>

        {/* Timer Setting */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-display font-bold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>4. 答题倒计时 (Tempo per Domanda)</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timerOptions.map((t) => {
              const active = settings.timeLimitSec === t.val;
              return (
                <button
                  key={t.val}
                  onClick={() => {
                    sound.playClick();
                    setSettings((prev) => ({ ...prev, timeLimitSec: t.val }));
                  }}
                  className={`py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-indigo-950 shadow-md shadow-amber-950'
                      : 'bg-indigo-950/60 text-slate-400 hover:text-white hover:bg-indigo-900/60 border border-indigo-900/40'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
