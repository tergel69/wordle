

import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  onShowStats?: () => void;
}

export function Header({ title = 'WORDLE', onShowStats }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.actions}>
        <button 
          className={styles.button}
          onClick={onShowStats}
          aria-label="Show statistics"
        >
          📊
        </button>
      </div>
    </header>
  );
}