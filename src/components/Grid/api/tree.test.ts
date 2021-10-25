import React from 'react';
import { traverseGrid } from './tree';

const grid = [
  [0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0]
];

describe('tree', () => {
  it('should traverse itself and set connected nodes', () => {
    const tree = traverseGrid(grid, { row: 1, column: 0 });
    expect(tree.nodes.length).toBe(4);
  });

  it('should traverse itself and set connected nodes to 1', () => {
    const tree = traverseGrid(grid, { row: 0, column: 4 });
    expect(tree.nodes.length).toBe(1);
  });

  it('should traverse itself and set connected nodes to 0', () => {
    const tree = traverseGrid(grid, { row: 0, column: 4 });
    expect(tree.nodes.length).toBe(1);
  });

  it('should traverse itself and set connected nodes to 0 if row or column indexes are out of bounds', () => {
    const tree = traverseGrid(grid, { row: -1, column: 4 });
    expect(tree.nodes.length).toBe(0);
  });

  it('should traverse itself and set connected nodes to 25 if the grid is full', () => {
    const emptyGrid = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ];
    const tree = traverseGrid(emptyGrid, { row: 0, column: 0 });
    expect(tree.nodes.length).toBe(25);
  });
});
