import { create } from 'zustand';
import { 
  GameMode,
  GAME_CONFIGS,
  LetterStatus, 
  GameStatus, 
  TileData,
  Statistics,
  ModeStatistics
} from '@/types';
import { 
  getGuessFeedback, 
  createInitialGuessesForMode 
} from '@/utils/gameLogic';
import { getDailyWordByLength } from '@/data/wordsMulti';
import { updateStatistics, loadStatistics, saveStatistics } from '@/utils/statistics';

// barasan baissan
const getStatusPriority = (status: LetterStatus | undefined): number => {
  switch (status) {
    case 'correct':
      return 3;
    case 'present':
      return 2;
    case 'absent':
      return 1;
    default:
      return 0;
  }
};

interface GameStore {
  // Game data
  targetWord: string;
  guesses: TileData[][];
  currentRow: number;
  currentTile: number;
  gameStatus: GameStatus;
  mode: GameMode;
  
  // Letter statuses for keyboard
  letterStatuses: Record<string, LetterStatus>;
  
  // Toast notification
  toast: { message: string; type: 'error' | 'success' } | null;
  
  // Statistics
  statistics: Statistics;
  
  // Actions
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => boolean;
  resetGame: () => void;
  setTargetWord: (word: string) => void;
  clearToast: () => void;
  initializeGame: (mode?: GameMode) => void;
  loadStats: () => void;
  setMode: (mode: GameMode) => void;
  getMaxAttempts: () => number;
  getWordLength: () => number;
}

// Helper to create initial guesses for a specific mode
const createInitialGuessesState = (mode: GameMode): TileData[][] => {
  const config = GAME_CONFIGS[mode];
  return Array(config.maxAttempts).fill(null).map(() =>
    Array(mode).fill(null).map(() => ({
      letter: '',
      status: 'empty' as LetterStatus
    }))
  );
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  targetWord: '',
  guesses: createInitialGuessesState(5),
  currentRow: 0,
  currentTile: 0,
  gameStatus: 'init',
  mode: 5,
  letterStatuses: {},
  toast: null,
  statistics: loadStatistics(),
  
  // Get word length for current mode
  getWordLength: () => get().mode,
  
  // Get max attempts for current mode
  getMaxAttempts: () => GAME_CONFIGS[get().mode].maxAttempts,
  
  // Set game mode
  setMode: (mode: GameMode) => {
    set({ mode });
  },
  
  // Initialize game with specific mode
  initializeGame: (mode?: GameMode) => {
    const currentMode = mode || get().mode;
    const word = getDailyWordByLength(currentMode);
    set({ 
      targetWord: word,
      guesses: createInitialGuessesState(currentMode),
      currentRow: 0,
      currentTile: 0,
      gameStatus: 'playing',
      letterStatuses: {},
      toast: null,
      statistics: loadStatistics()
    });
  },
  
  // Load statistics
  loadStats: () => {
    set({ statistics: loadStatistics() });
  },
  
  // Add a letter to current tile
  addLetter: (letter: string) => {
    const state = get();
    const wordLength = state.mode;
    
    if (state.gameStatus !== 'playing') return;
    if (state.currentTile >= wordLength) return;
    
    const newGuesses = state.guesses.map((row, rowIndex) =>
      rowIndex === state.currentRow
        ? row.map((tile, tileIndex) =>
            tileIndex === state.currentTile 
              ? { ...tile, letter: letter.toUpperCase() } 
              : tile
          )
        : row
    );
    
    set({ 
      guesses: newGuesses, 
      currentTile: state.currentTile + 1 
    });
  },
  
  // Remove last letter
  removeLetter: () => {
    const state = get();
    
    if (state.gameStatus !== 'playing') return;
    if (state.currentTile <= 0) return;
    
    const newGuesses = state.guesses.map((row, rowIndex) =>
      rowIndex === state.currentRow
        ? row.map((tile, tileIndex) =>
            tileIndex === state.currentTile - 1 
              ? { letter: '', status: 'empty' as LetterStatus } 
              : tile
          )
        : row
    );
    
    set({ 
      guesses: newGuesses, 
      currentTile: state.currentTile - 1 
    });
  },
  
  // Submit current guess
  submitGuess: () => {
    const state = get();
    const { guesses, currentRow, targetWord, gameStatus, statistics, mode } = state;
    const wordLength = mode;
    
    if (gameStatus !== 'playing') return false;
    
    // Get current guess
    const currentGuess = guesses[currentRow]
      .map((l: TileData) => l.letter)
      .join('');
    
    // Validate
    if (currentGuess.length !== wordLength) {
      set({ toast: { message: `Not enough letters (${wordLength} required)`, type: 'error' } });
      return false;
    }
    
    // Get feedback
    const feedback = getGuessFeedback(currentGuess, targetWord);
    
    // Update guesses with feedback
    const newGuesses = [...guesses];
    newGuesses[currentRow] = feedback.map(f => ({ letter: f.letter, status: f.status }));
    
    // Update letter statuses for keyboard
    const newLetterStatuses = { ...state.letterStatuses };
    feedback.forEach(f => {
      const currentStatus = newLetterStatuses[f.letter];
      const currentPriority = getStatusPriority(currentStatus);
      const newPriority = getStatusPriority(f.status);
      
      if (newPriority > currentPriority) {
        newLetterStatuses[f.letter] = f.status;
      }
    });
    
    // Check win/loss
    const isWin = currentGuess === targetWord;
    const maxAttempts = GAME_CONFIGS[mode].maxAttempts;
    const isLoss = !isWin && currentRow === maxAttempts - 1;
    const nextTile = state.currentTile;
    
    // Update statistics
    if (isWin || isLoss) {
      const newStats = updateStatistics(statistics, isWin, currentRow + 1, mode);
      saveStatistics(newStats);
      set({ statistics: newStats });
    }
    
    // Set toast message for game end
    let toastMessage: { message: string; type: 'error' | 'success' } | null = null;
    if (isWin) {
      toastMessage = { message: 'Congratulations!', type: 'success' };
    } else if (isLoss) {
      toastMessage = { message: `The word was ${targetWord}`, type: 'error' };
    }
    
    set({
      guesses: newGuesses,
      currentRow: isWin || isLoss ? currentRow : currentRow + 1,
      currentTile: isWin || isLoss ? nextTile : 0,
      gameStatus: isWin ? 'won' : isLoss ? 'lost' : 'playing',
      letterStatuses: newLetterStatuses,
      toast: toastMessage
    });
    
    return true;
  },
  
  // Reset game
  resetGame: () => {
    const mode = get().mode;
    const word = getDailyWordByLength(mode);
    set({
      targetWord: word,
      guesses: createInitialGuessesState(mode),
      currentRow: 0,
      currentTile: 0,
      gameStatus: 'playing',
      letterStatuses: {},
      toast: null
    });
  },
  
  // Set target word (for testing)
  setTargetWord: (word: string) => {
    set({ targetWord: word.toUpperCase() });
  },
  
  // Clear toast
  clearToast: () => {
    set({ toast: null });
  }
}));