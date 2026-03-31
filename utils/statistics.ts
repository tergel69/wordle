// Statistics utilities for multi-length Wordle games

import { GameMode, GAME_CONFIGS, Statistics, ModeStatistics } from '@/types';

const STORAGE_KEY = 'wordle-statistics';

/**
 * Get default mode statistics
 */
function getDefaultModeStatistics(): ModeStatistics {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0, 0, 0], // Max 8 attempts
    lastPlayed: null,
    lastResult: null
  };
}

/**
 * Get default statistics for all modes
 */
export function getDefaultStatistics(): Statistics {
  return {
    modeStats: {
      3: getDefaultModeStatistics(),
      4: getDefaultModeStatistics(),
      5: getDefaultModeStatistics(),
      6: getDefaultModeStatistics(),
      7: getDefaultModeStatistics(),
      8: getDefaultModeStatistics(),
      9: getDefaultModeStatistics()
    }
  };
}

/**
 * Load statistics from localStorage
 */
export function loadStatistics(): Statistics {
  if (typeof window === 'undefined') {
    return getDefaultStatistics();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Handle legacy format (single-mode statistics)
      if (!parsed.modeStats) {
        return migrateStatistics(parsed);
      }
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load statistics:', error);
  }
  
  return getDefaultStatistics();
}

/**
 * Migrate legacy statistics to new format
 */
function migrateStatistics(legacyStats: any): Statistics {
  const newStats = getDefaultStatistics();
  
  if (legacyStats.gamesPlayed > 0) {
    // Migrate legacy 5-letter stats to mode 5
    const distribution: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    if (legacyStats.guessDistribution) {
      for (let i = 1; i <= 6; i++) {
        distribution[i - 1] = legacyStats.guessDistribution[i] || 0;
      }
    }
    
    newStats.modeStats[5] = {
      gamesPlayed: legacyStats.gamesPlayed || 0,
      gamesWon: legacyStats.gamesWon || 0,
      currentStreak: legacyStats.currentStreak || 0,
      maxStreak: legacyStats.maxStreak || 0,
      guessDistribution: distribution,
      lastPlayed: legacyStats.lastPlayedDate || null,
      lastResult: legacyStats.gamesWon > 0 ? 'won' : legacyStats.gamesPlayed > 0 ? 'lost' : null
    };
  }
  
  return newStats;
}

/**
 * Save statistics to localStorage
 */
export function saveStatistics(stats: Statistics): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save statistics:', error);
  }
}

/**
 * Get today's date string
 */
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get yesterday's date string
 */
function getYesterdayDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/**
 * Update statistics after a game for a specific mode
 */
export function updateStatistics(
  stats: Statistics,
  won: boolean,
  guesses: number,
  mode: GameMode
): Statistics {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();
  
  const modeStats = stats.modeStats[mode];
  const maxAttempts = GAME_CONFIGS[mode].maxAttempts;
  
  // Calculate new streak
  let newStreak = 0;
  
  if (won) {
    // If played yesterday or today, continue streak
    if (modeStats.lastPlayed === yesterday || modeStats.lastPlayed === today) {
      newStreak = modeStats.currentStreak + 1;
    } else {
      // Streak broken, start new one
      newStreak = 1;
    }
  }
  
  // Update guess distribution if won (clamp to max attempts)
  const guessIndex = Math.min(guesses, maxAttempts) - 1;
  const newDistribution = [...modeStats.guessDistribution];
  if (won && guessIndex >= 0 && guessIndex < newDistribution.length) {
    newDistribution[guessIndex]++;
  }
  
  // Create updated mode statistics
  const newModeStats: ModeStatistics = {
    gamesPlayed: modeStats.gamesPlayed + 1,
    gamesWon: won ? modeStats.gamesWon + 1 : modeStats.gamesWon,
    currentStreak: newStreak,
    maxStreak: Math.max(modeStats.maxStreak, newStreak),
    guessDistribution: newDistribution,
    lastPlayed: today,
    lastResult: won ? 'won' : 'lost'
  };
  
  return {
    modeStats: {
      ...stats.modeStats,
      [mode]: newModeStats
    }
  };
}

/**
 * Calculate win percentage for a specific mode
 */
export function getWinPercentage(stats: Statistics, mode: GameMode): number {
  const modeStats = stats.modeStats[mode];
  if (modeStats.gamesPlayed === 0) {
    return 0;
  }
  return Math.round((modeStats.gamesWon / modeStats.gamesPlayed) * 100);
}

/**
 * Get the day number for the game
 */
export function getDayNumber(): number {
  const gameStartDate = new Date('2024-01-01');
  const today = new Date();
  const diffTime = today.getTime() - gameStartDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

/**
 * Get mode statistics
 */
export function getModeStats(stats: Statistics, mode: GameMode): ModeStatistics {
  return stats.modeStats[mode];
}