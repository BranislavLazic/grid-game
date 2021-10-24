import React, { useState, useEffect } from 'react';
import { useGridContext } from '../../../context/GridProvider';
import { traverseGrid } from '../api/tree';
import cx from 'classnames';
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

const Cell = ({ cellValue, cellPosition, grid }: CellProps) => {
  const [cellColor, setCellColor] = useState(
    cellValue === 1 ? styles.cellFilled : styles.cellBlank,
  );
  const [connectionsCount, setConnectionsCount] = useState('');

  const { selectedCell, setSelectedCell, connectedNodes, setConnectedNodes } =
    useGridContext();

  useEffect(() => {
    setCellColor(cellValue === 1 ? styles.cellFilled : styles.cellBlank);
    setConnectionsCount('');
  }, [cellValue, grid]);

  useEffect(() => {
    if (
      selectedCell.row !== cellPosition.row ||
      selectedCell.column !== cellPosition.column
    ) {
      setConnectionsCount('');
    }
  }, [selectedCell, cellPosition]);

  useEffect(() => {
    if (cellValue === 1) {
      if (
        connectedNodes.length > 0 &&
        connectedNodes.some(
          (n) => n.row === cellPosition.row && n.column === cellPosition.column,
        )
      ) {
        setCellColor(styles.cellHover);
      } else {
        setCellColor(styles.cellFilled);
      }
    }
  }, [connectedNodes, cellValue, cellPosition]);

  const handleClick = () => {
    if (cellValue === 1) {
      setSelectedCell({ row: cellPosition.row, column: cellPosition.column });
      connectedNodes.length.toString();
      setConnectionsCount(connectedNodes.length.toString());
    }
  };

  const handleHover = () => {
    if (cellValue === 1) {
      const tree = traverseGrid(grid, {
        row: cellPosition.row,
        column: cellPosition.column,
      });
      setConnectedNodes(tree.nodes);
    } else {
      setConnectedNodes([]);
    }
  };

  return (
    <div
      className={cx(styles.cell, cellColor)}
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {connectionsCount}
    </div>
  );
};

export default Cell;
