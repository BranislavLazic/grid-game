import React from 'react';
import { Cell } from './Cell';
import styles from './Grid.module.css';

type GridProps = {
  grid: number[][];
};

const Grid = ({ grid }: GridProps): JSX.Element => {
  return (
    <div className={styles.grid}>
      {grid.map((row, idxRow) => (
        <div key={idxRow} className={styles.row}>
          {row.map((col, idxCol) => {
            return (
              <Cell
                key={idxCol}
                cellValue={col}
                grid={grid}
                cellPosition={{ row: idxRow, column: idxCol }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
