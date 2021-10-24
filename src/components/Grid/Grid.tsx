import React, { useEffect } from 'react';
import { Cell } from './Cell';
import { useGridContext } from '../../context/GridProvider';
import styles from './Grid.module.css';

type GridProps = {
  grid: number[][];
};

const Grid = ({ grid }: GridProps) => {
  const { setConnectedNodes } = useGridContext();
  useEffect(() => {
    setConnectedNodes([]);
  }, [grid, setConnectedNodes]);

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
