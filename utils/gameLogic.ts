import { LetterStatus, GameMode, GAME_CONFIGS } from '@/types';

// Letter feedback from guess
export interface LetterFeedback {
  letter: string;
  status: LetterStatus;
  position: number;
}

/**
 * taamaglaliin sanal avah
 */
export function getGuessFeedback(guess: string, targetWord: string): LetterFeedback[] {
  const guessLetters = guess.toUpperCase().split('');
  const targetLetters = targetWord.toUpperCase().split('');
  const wordLength = targetLetters.length;
  const status: LetterStatus[] = new Array(wordLength).fill('absent');
  
  // temdeglekh
  const targetMatched = new Array(wordLength).fill(false);
  
  // ekhni shalgalt
  for (let i = 0; i < wordLength; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      status[i] = 'correct';
      targetMatched[i] = true;
    }
  }
  
  // khoer dakh shalgalt
  for (let i = 0; i < wordLength; i++) {
    if (status[i] !== 'correct') {
      // oldokhgui useg khaikh
      for (let j = 0; j < wordLength; j++) {
        if (!targetMatched[j] && guessLetters[i] === targetLetters[j]) {
          status[i] = 'present';
          targetMatched[j] = true;
          break;
        }
      }
    }
  }
  
  return guessLetters.map((letter, i) => ({
    letter,
    status: status[i],
    position: i
  }));
}

/**
 * Validate a guess for a specific mode
 */
export function validateGuess(
  guess: string, 
  validWords: string[], 
  mode: GameMode
): { isValid: boolean; error?: string } {
  const upperGuess = guess.toUpperCase();
  const wordLength = mode;
  
  if (upperGuess.length !== wordLength) {
    return { isValid: false, error: `Word must be ${wordLength} letters` };
  }
  
  if (!validWords.includes(upperGuess)) {
    return { isValid: false, error: 'Not in word list' };
  }
  
  return { isValid: true };
}

/**
 * Create an empty tile row for a specific mode
 */
export function createEmptyRow(mode: GameMode): { letter: string; status: LetterStatus }[] {
  return Array(mode).fill(null).map(() => ({
    letter: '',
    status: 'empty' as LetterStatus
  }));
}

/**
 * Create initial guesses array for a specific mode
 */
export function createInitialGuessesForMode(mode: GameMode): { letter: string; status: LetterStatus }[][] {
  const config = GAME_CONFIGS[mode];
  return Array(config.maxAttempts).fill(null).map(() => createEmptyRow(mode));
}

// legacy function for backward compatibility
export function createInitialGuesses(): { letter: string; status: LetterStatus }[][] {
  return createInitialGuessesForMode(5);
}

/**
 * Get status color for a letter
 */
export function getLetterStatusColor(status: LetterStatus): string {
  switch (status) {
    case 'correct':
      return '#6aaa64';
    case 'present':
      return '#c9b458';
    case 'absent':
      return '#787c7e';
    default:
      return 'transparent';
  }
}

/**
 * Get letter status priority (correct > present > absent)
 */
export function getStatusPriority(status: LetterStatus): number {
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
}

/**
 * Get emoji representation for share
 */
export function getShareEmoji(status: LetterStatus): string {
  switch (status) {
    case 'correct':
      return '🟩';
    case 'present':
      return '🟨';
    case 'absent':
      return '⬛';
    default:
      return '⬜';
  }
}

/**
 * Generate share text for a completed game
 */
export function generateShareText(
  guesses: { letter: string; status: LetterStatus }[][],
  mode: GameMode,
  won: boolean,
  attempts: number
): string {
  const dayNumber = Math.floor(
    (Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;
  
  const header = `Wordle ${dayNumber} ${mode}/${GAME_CONFIGS[mode].maxAttempts}${won ? attempts : 'X'}\n`;
  
  const board = guesses
    .filter(row => row.every(tile => tile.status !== 'empty'))
    .map(row => row.map(tile => getShareEmoji(tile.status)).join(''))
    .join('\n');
  
  return header + board;
}