export type TreeNode = {
  row: number;
  column: number;
};

type Tree = {
  nodes: TreeNode[];
};

type Grid = number[][];

class Queue<T> {
  private store: T[] = [];

  push(val: T) {
    this.store.push(val);
  }

  pop(): T | undefined {
    return this.store.shift();
  }

  some(f: (arg: T) => boolean): boolean {
    return this.store.some(f);
  }

  size(): number {
    return this.store.length;
  }
}

const findAdjacent = ({ row, column }: TreeNode, grid: Grid): TreeNode[] => {
  const gridSize = grid.length;
  let children: TreeNode[] = [];
  if (column !== 0) {
    children = [...children, { row: row, column: column - 1 }];
  }
  if (column !== gridSize - 1) {
    children = [...children, { row: row, column: column + 1 }];
  }
  if (row !== 0) {
    children = [...children, { row: row - 1, column: column }];
  }
  if (row !== gridSize - 1) {
    children = [...children, { row: row + 1, column: column }];
  }
  return children.filter((child) => grid[child.row][child.column]);
};

export const mapToTree = (grid: Grid, { row, column }: TreeNode): Tree => {
  let tree: Tree = { nodes: [] };
  let queue = new Queue<TreeNode>();
  if (row < 0 || row >= grid.length || column < 0 || column >= grid.length) {
    return tree;
  }
  const valueAt = grid[row][column];
  if (valueAt === 1) {
    // Add root
    const root = { row: row, column: column };
    tree.nodes.push(root);
    // Find adjacent nodes around the root
    findAdjacent(root, grid).forEach((n) => queue.push(n));
    // For each adjacent node, find their adjacent nodes and repeat
    // until all nodes are added to the tree
    while (queue.size() !== 0) {
      const currentElement = queue.pop();
      if (currentElement) {
        tree.nodes.push(currentElement);
        findAdjacent(
          { row: currentElement.row, column: currentElement.column },
          grid
        )
          .filter(
            // Filter child nodes if they already exist among tree nodes
            (child) =>
              !tree.nodes.some(
                (node) => node.row === child.row && node.column === child.column
              )
          )
          .forEach((child) => {
            // Push distinct
            const exists = queue.some(
              (node) => node.row === child.row && node.column === child.column
            );
            if (!exists) {
              queue.push(child);
            }
          });
      }
    }
  }
  return tree;
};

// const grid = [
//   [0, 0, 0, 0, 1],
//   [1, 1, 0, 0, 0],
//   [1, 1, 0, 1, 1],
//   [0, 0, 0, 0, 0],
//   [1, 1, 1, 0, 0],
// ];

// const tree = traverseGrid(grid, { row: 1, column: 0 });
// console.log(tree.nodes.length);
// console.log(tree);
