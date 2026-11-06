import { DailyStreakData } from '../types/game';

const STREAK_STORAGE_KEY = 'kahoot_italiano_daily_streak_v1';

/** Format a Date to YYYY-MM-DD in local timezone */
export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayString(): string {
  return formatDateToISO(new Date());
}

export function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateToISO(d);
}

/** Calculate calendar day difference between dateStr1 and dateStr2 (dateStr1 - dateStr2 in days) */
export function getDaysDifference(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = d1.getTime() - d2.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

const DEFAULT_STREAK: DailyStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: '',
  completedDates: [],
  totalQuizzesCompleted: 0,
  todayCompleted: false,
};

/**
 * Retrieve and normalize current daily streak data
 */
export function getDailyStreakData(): DailyStreakData {
  if (typeof window === 'undefined') return { ...DEFAULT_STREAK };

  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_STREAK };
    }

    const parsed: DailyStreakData = JSON.parse(raw);
    const todayStr = getTodayString();
    const yesterdayStr = getYesterdayString();

    const completedDates = Array.isArray(parsed.completedDates) ? parsed.completedDates : [];
    const todayDone = parsed.lastCompletedDate === todayStr || completedDates.includes(todayStr);

    let currentStreak = parsed.currentStreak || 0;
    const longestStreak = parsed.longestStreak || 0;

    // Check if streak was broken (last quiz completed before yesterday)
    if (parsed.lastCompletedDate) {
      if (parsed.lastCompletedDate === todayStr) {
        // Active, completed today
      } else if (parsed.lastCompletedDate === yesterdayStr) {
        // Active, not completed today yet
      } else {
        // More than 1 day missed -> reset current streak
        currentStreak = 0;
      }
    } else {
      currentStreak = 0;
    }

    const normalized: DailyStreakData = {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      lastCompletedDate: parsed.lastCompletedDate || '',
      completedDates,
      totalQuizzesCompleted: parsed.totalQuizzesCompleted || 0,
      todayCompleted: todayDone,
    };

    // If state changed due to expiry, save back
    if (normalized.currentStreak !== parsed.currentStreak || normalized.todayCompleted !== parsed.todayCompleted) {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(normalized));
    }

    return normalized;
  } catch {
    return { ...DEFAULT_STREAK };
  }
}

/**
 * Record completion of a quiz and advance daily streak
 */
export function recordDailyQuizCompletion(): {
  data: DailyStreakData;
  isFirstToday: boolean;
  streakIncreased: boolean;
} {
  const current = getDailyStreakData();
  const todayStr = getTodayString();
  const yesterdayStr = getYesterdayString();

  let isFirstToday = false;
  let streakIncreased = false;
  let newCurrentStreak = current.currentStreak;

  const completedDatesSet = new Set(current.completedDates);

  if (!current.todayCompleted) {
    isFirstToday = true;
    streakIncreased = true;

    if (current.lastCompletedDate === yesterdayStr) {
      newCurrentStreak = current.currentStreak + 1;
    } else {
      // First day ever or streak restarted
      newCurrentStreak = 1;
    }

    completedDatesSet.add(todayStr);
  }

  const newLongest = Math.max(current.longestStreak, newCurrentStreak);
  const updatedData: DailyStreakData = {
    currentStreak: newCurrentStreak,
    longestStreak: newLongest,
    lastCompletedDate: todayStr,
    completedDates: Array.from(completedDatesSet),
    totalQuizzesCompleted: (current.totalQuizzesCompleted || 0) + 1,
    todayCompleted: true,
  };

  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updatedData));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kahoot_streak_updated', { detail: updatedData }));
    }
  } catch {
    // ignore localStorage error
  }

  return {
    data: updatedData,
    isFirstToday,
    streakIncreased,
  };
}

/** Streak tier and rank descriptions */
export interface StreakMilestone {
  tier: string;
  badgeZh: string;
  badgeIt: string;
  icon: string;
  color: string;
  minDays: number;
  nextMilestone: number | null;
  message: string;
}

export function getStreakMilestone(days: number): StreakMilestone {
  if (days >= 30) {
    return {
      tier: 'legend',
      badgeZh: '意大利语传奇 (30天+)',
      badgeIt: 'Leggenda Italiana',
      icon: '👑',
      color: 'from-amber-400 to-yellow-500',
      minDays: 30,
      nextMilestone: null,
      message: '难以置信的非凡毅力！你已经完全内化了意大利语语法与词汇！',
    };
  }
  if (days >= 14) {
    return {
      tier: 'master',
      badgeZh: '恒心宗师 (14天+)',
      badgeIt: 'Maestro di Costanza',
      icon: '🌟',
      color: 'from-purple-500 to-indigo-500',
      minDays: 14,
      nextMilestone: 30,
      message: '两周连胜！动词三大变位与物主形容词已成肌肉记忆！',
    };
  }
  if (days >= 7) {
    return {
      tier: 'champion',
      badgeZh: '周胜学者 (7天+)',
      badgeIt: 'Campione Settimanale',
      icon: '⚡',
      color: 'from-emerald-500 to-teal-500',
      minDays: 7,
      nextMilestone: 14,
      message: '连续一周打卡！你击败了90%的初学者，继续保持！',
    };
  }
  if (days >= 3) {
    return {
      tier: 'flame',
      badgeZh: '稳定燃动 (3天+)',
      badgeIt: 'Fiamma Costante',
      icon: '🔥',
      color: 'from-orange-500 to-amber-500',
      minDays: 3,
      nextMilestone: 7,
      message: '火种越烧越旺！连续3天完成做题，习惯正在形成！',
    };
  }
  if (days >= 1) {
    return {
      tier: 'spark',
      badgeZh: '点燃火花 (1天+)',
      badgeIt: 'Scintilla Accesa',
      icon: '✨',
      color: 'from-rose-500 to-orange-500',
      minDays: 1,
      nextMilestone: 3,
      message: '今天已完成打卡！明天继续做一套题，开启连胜火焰！',
    };
  }
  return {
    tier: 'starter',
    badgeZh: '准备起跑 (今日待打卡)',
    badgeIt: 'Pronto a Partire',
    icon: '⏳',
    color: 'from-slate-600 to-slate-700',
    minDays: 0,
    nextMilestone: 1,
    message: '今天还没有完成任何测验哦，完成 1 套题即可点燃每日连胜火焰！',
  };
}

export interface DayProgress {
  dateStr: string;
  dayShort: string;
  dayZh: string;
  isToday: boolean;
  isCompleted: boolean;
}

/** Get rolling 7 days (ending today) or current week for visual tracker */
export function getRecentWeekProgress(completedDates: string[]): DayProgress[] {
  const result: DayProgress[] = [];
  const completedSet = new Set(completedDates);
  const dayNamesEn = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const dayNamesZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const todayStr = getTodayString();

  // Generate last 7 days: 6 days ago up to today
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = formatDateToISO(d);
    const dayOfWeek = d.getDay();

    result.push({
      dateStr,
      dayShort: dayNamesEn[dayOfWeek],
      dayZh: dayNamesZh[dayOfWeek],
      isToday: dateStr === todayStr,
      isCompleted: completedSet.has(dateStr),
    });
  }

  return result;
}
