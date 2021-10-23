import React from 'react';
import styles from './Cell.module.css';

type CellPosition = {
  row: number;
  column: number;
};

type CellProps = {
  cellValue: number;
  cellPosition: CellPosition;
  grid: number[][];
};

const Cell = ({ cellValue, cellPosition, grid }: CellProps): JSX.Element => {
  const cellColor = cellValue === 1 ? styles.cellColored : styles.cellBlank;

  const handleClick = () => {
    if (cellValue === 1) {
      console.log(cellPosition);
    }
  };

  return (
    <div className={`${styles.cell} ${cellColor}`} onClick={handleClick}></div>
  );
};

export default Cell;
