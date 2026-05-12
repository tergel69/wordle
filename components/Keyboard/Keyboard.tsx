import { useCallback, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { LetterStatus } from '@/types';
import styles from './Keyboard.module.css';

interface KeyboardProps {
  onShowStats?: () => void;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export function Keyboard({ onShowStats }: KeyboardProps) {
  const { addLetter, removeLetter, submitGuess, letterStatuses } = useGameStore();
  
  const handleKeyPress = useCallback((key: string) => {
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === '⌫' || key === 'BACKSPACE') {
      removeLetter();
    } else if (key.length === 1 && /^[A-Z]$/i.test(key)) {
      addLetter(key.toUpperCase());
    }
  }, [addLetter, removeLetter, submitGuess]);
  
  // gar tovchluuriin sonsgoch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // oroltiin talbart bikh ued algasakh
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || (key.length === 1 && /^[A-Z]$/.test(key))) {
        e.preventDefault();
        handleKeyPress(key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);
  
  const getKeyStatus = (key: string): LetterStatus | undefined => {
    if (key === 'ENTER' || key === '⌫') return undefined;
    return letterStatuses[key];
  };
  
  return (
    <div className={styles.keyboard} role="group" aria-label="On-screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => {
            const status = getKeyStatus(key);
            const keyClasses = [
              styles.key,
              status ? styles[status] : '',
              key === 'ENTER' || key === '⌫' ? styles.wide : ''
            ].filter(Boolean).join(' ');
            
            return (
              <button
                key={key}
                className={keyClasses}
                onClick={() => handleKeyPress(key)}
                aria-label={key === '⌫' ? 'Delete' : key}
              >
                {key === '⌫' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}