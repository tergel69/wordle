import { LetterStatus } from '@/types';
import styles from './Tile.module.css';

interface TileProps {
  letter: string;
  status: LetterStatus;
  row: number;
  col: number;
  isActive?: boolean;
}

export function Tile({ letter, status, row, col, isActive }: TileProps) {
  const classes = [
    styles.tile,
    styles[status],
    isActive && styles.active,
    letter && styles.filled
  ].filter(Boolean).join(' ');

  const ariaLabel = `Row ${row + 1}, Column ${col + 1}, ${letter || 'empty'}, ${status !== 'empty' ? status : 'empty'}`;

  return (
    <div 
      className={classes}
      role="gridcell"
      aria-label={ariaLabel}
      aria-current={isActive ? 'true' : undefined}
    >
      <span className={styles.letter}>{letter}</span>
    </div>
  );
}