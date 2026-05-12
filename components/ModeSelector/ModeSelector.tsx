import { useState } from 'react';
import { GameMode, GAME_CONFIGS } from '@/types';
import styles from './ModeSelector.module.css';

interface ModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  disabled?: boolean;
}

const AVAILABLE_MODES: GameMode[] = [3, 4, 5, 6, 7, 8, 9];

export function ModeSelector({ currentMode, onModeChange, disabled = false }: ModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    if (mode !== currentMode) {
      onModeChange(mode);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.trigger}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label={`Current mode: ${currentMode} letters. Click to change.`}
        aria-expanded={isOpen}
      >
        <span className={styles.label}>{currentMode}</span>
        <span className={styles.suffix}>letter</span>
        {!disabled && (
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        )}
      </button>
      
      {isOpen && (
        <div className={styles.dropdown} role="menu">
          {AVAILABLE_MODES.map((mode) => (
            <button
              key={mode}
              className={`${styles.option} ${mode === currentMode ? styles.active : ''}`}
              onClick={() => handleModeSelect(mode)}
              role="menuitem"
            >
              <span className={styles.optionNumber}>{mode}</span>
              <span className={styles.optionLabel}>letters</span>
              <span className={styles.optionAttempts}>
                {GAME_CONFIGS[mode].maxAttempts} attempts
              </span>
            </button>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}