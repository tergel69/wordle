// Game mode types
export type GameMode = 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface GameConfig {
  mode: GameMode;
  maxAttempts: number;
}

export const GAME_CONFIGS: Record<GameMode, GameConfig> = {
  3: { mode: 3, maxAttempts: 5 },
  4: { mode: 4, maxAttempts: 5 },
  5: { mode: 5, maxAttempts: 6 },
  6: { mode: 6, maxAttempts: 6 },
  7: { mode: 7, maxAttempts: 7 },
  8: { mode: 8, maxAttempts: 7 },
  9: { mode: 9, maxAttempts: 8 },
};

// Legacy config for backward compatibility
export const GAME_CONFIG = {
  WORD_LENGTH: 5,
  MAX_GUESSES: 6
};

// Letter status for feedback
export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

// Tile state
export interface TileData {
  letter: string;
  status: LetterStatus;
}

// Row state
export interface RowData {
  tiles: TileData[];
  isSubmitted: boolean;
}

// Game board state
export interface BoardState {
  rows: RowData[];
  currentRow: number;
  currentTile: number;
  gameStatus: GameStatus;
  targetWord: string;
  mode: GameMode;
}

// Game status
export type GameStatus = 'playing' | 'won' | 'lost' | 'init';

// Keyboard key state
export interface KeyState {
  status: LetterStatus;
  count: number;
}

// Statistics per game mode
export interface ModeStatistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastPlayed: string | null;
  lastResult: 'won' | 'lost' | null;
}

// Overall statistics
export interface Statistics {
  modeStats: Record<GameMode, ModeStatistics>;
}

// Share data structure
export interface ShareData {
  success: boolean;
  board: string[][];
  mode: GameMode;
  dayNumber: number;
  attempts: number;
}

// Keyboard row configuration
export interface KeyboardRow {
  keys: string[];
  width?: number;
}

// Backward-compatible types for existing store
// Legacy guess data (fixed 5 letters)
export interface GuessData {
  letters: TileData[];
  isComplete: boolean;
}

// Legacy game statistics
export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastPlayed: string | null;
  lastResult: 'won' | 'lost' | null;
}

// Legacy game state (fixed 5 letters, 6 attempts)
export interface GameState {
  targetWord: string;
  guesses: GuessData[];
  currentRow: number;
  currentTile: number;
  gameStatus: GameStatus;
  letterStatuses: Record<string, LetterStatus>;
}