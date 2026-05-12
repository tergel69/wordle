import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getWinPercentage, getModeStats } from '@/utils/statistics';
import { GameMode, Statistics as StatsType, ModeStatistics } from '@/types';
import { GAME_CONFIGS } from '@/types';
import styles from './Statistics.module.css';

interface StatisticsProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode?: GameMode;
}

export function Statistics({ isOpen, onClose, currentMode = 5 }: StatisticsProps) {
  const { statistics } = useGameStore();
  const [stats, setStats] = useState<StatsType>(statistics);
  
  useEffect(() => {
    setStats(statistics);
  }, [statistics]);
  
  if (!isOpen) return null;
  
  const modeStats = getModeStats(stats, currentMode);
  const winPercentage = getWinPercentage(stats, currentMode);
  const maxAttempts = GAME_CONFIGS[currentMode].maxAttempts;
  
  // Calculate max distribution for scaling
  const maxDistribution = Math.max(...modeStats.guessDistribution, 1);
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>STATISTICS</h2>
        
        <div className={styles.modeIndicator}>
          {currentMode}-letter mode
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.value}>{modeStats.gamesPlayed}</span>
            <span className={styles.label}>Played</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.value}>{winPercentage}</span>
            <span className={styles.label}>Win %</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.value}>{modeStats.currentStreak}</span>
            <span className={styles.label}>Current Streak</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.value}>{modeStats.maxStreak}</span>
            <span className={styles.label}>Max Streak</span>
          </div>
        </div>
        
        <div className={styles.distribution}>
          <h3 className={styles.subtitle}>GUESS DISTRIBUTION</h3>
          {Array.from({ length: maxAttempts }, (_, i) => i + 1).map(num => {
            const count = modeStats.guessDistribution[num - 1] || 0;
            const width = Math.max(10, (count / maxDistribution) * 100);
            
            return (
              <div key={num} className={styles.row}>
                <span className={styles.guessNumber}>{num}</span>
                <div 
                  className={styles.bar}
                  style={{ width: `${width}%` }}
                >
                  {count}
                </div>
              </div>
            );
          })}
        </div>
        
        {modeStats.lastResult && (
          <div className={styles.lastResult}>
            Last game: {modeStats.lastResult === 'won' ? 'Won' : 'Lost'}
          </div>
        )}
        
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}