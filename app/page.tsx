'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Header } from '@/components/Header/Header';
import { GameBoard } from '@/components/GameBoard/GameBoard';
import { Keyboard } from '@/components/Keyboard/Keyboard';
import { Statistics } from '@/components/Statistics/Statistics';
import { ModeSelector } from '@/components/ModeSelector/ModeSelector';
import { GameMode } from '@/types';
import styles from './page.module.css';

export default function Home() {
  const { 
    initializeGame, 
    toast, 
    clearToast, 
    gameStatus, 
    resetGame,
    mode,
    setMode,
    gameStatus: currentStatus
  } = useGameStore();
  let [showStats, setShowStats] = useState(false);
  
  // eniig daraa zasah heregtei
  useEffect(() => {
    initializeGame();
    // console.log('game initialized'); // debug
  }, [initializeGame]);
  
  // tseverleh
  useEffect(() => {
    if (toast) {
      let timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);
  
  const handleShowStats = () => {
    setShowStats(true);
  };
  
  const handleCloseStats = () => {
    setShowStats(false);
  };
  
  const handlePlayAgain = () => {
    resetGame();
    setShowStats(false);
  };
  
  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    initializeGame(newMode);
    setShowStats(false);
  };
  
  let isGameOver = currentStatus === 'won' || currentStatus === 'lost';
  const unused = null; // mart
  
  return (
    <main className={styles.container}>
      <Header title="WORDLE" onShowStats={handleShowStats} />
      
      <div className={styles.modeSelector}>
        <ModeSelector 
          currentMode={mode} 
          onModeChange={handleModeChange}
          disabled={isGameOver}
        />
      </div>
      
      <div className={styles.game}>
        <GameBoard />
        <Keyboard />
      </div>
      
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
      
      {gameStatus === 'won' && (
        <div className={styles.resultModal}>
          <div className={styles.resultContent}>
            <h2>🎉 Congratulations!</h2>
            <p>You guessed the word!</p>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        </div>
      )}
      
      {gameStatus === 'lost' && (
        <div className={styles.resultModal}>
          <div className={styles.resultContent}>
            <h2>😔 Game Over</h2>
            <p>Better luck next time!</p>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        </div>
      )}
      
      <Statistics isOpen={showStats} onClose={handleCloseStats} currentMode={mode} />
    </main>
  );
}