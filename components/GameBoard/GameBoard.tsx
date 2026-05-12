import { useGameStore } from '@/store/gameStore';
import { Tile } from '@/components/Tile/Tile';
import styles from './GameBoard.module.css';

export function GameBoard() {
  const { guesses, currentRow, currentTile, mode } = useGameStore();
  
  return (
    <div 
      className={styles.board}
      role="grid"
      aria-label="Word guessing game board"
    >
      {guesses.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={styles.row} 
          role="row"
          style={{ gridTemplateColumns: `repeat(${mode}, 1fr)` }}
        >
          {row.map((tile, colIndex) => (
            <Tile
              key={colIndex}
              letter={tile.letter}
              status={tile.status}
              row={rowIndex}
              col={colIndex}
              isActive={rowIndex === currentRow && colIndex === currentTile}
            />
          ))}
        </div>
      ))}
    </div>
  );
}