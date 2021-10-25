export type TreeNode = {
  row: number;
  column: number;
};

type Tree = {
  nodes: TreeNode[];
};

type Grid = number[][];

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
  let children: TreeNode[] = [];
  if (row < 0 || row >= grid.length || column < 0 || column >= grid.length) {
    return tree;
  }
  const valueAt = grid[row][column];
  if (valueAt === 1) {
    // Add root
    const root = { row: row, column: column };
    tree.nodes.push(root);
    // Find adjacent nodes around the root
    findAdjacent(root, grid).forEach((n) => children.push(n));
    // For each adjacent node, find their adjacent nodes and repeat
    // until all nodes are added to the tree
    while (children.length !== 0) {
      const currentElement = children.pop();
      if (currentElement) {
        tree.nodes.push(currentElement);
        findAdjacent(
          { row: currentElement.row, column: currentElement.column },
          grid
        )
          .filter(
            // Distinct child nodes if they already exist among tree nodes
            (child) =>
              !tree.nodes.some(
                (node) => node.row === child.row && node.column === child.column
              )
          )
          .forEach((child) => {
            // Push distinct to children collection
            const exists = children.some(
              (node) => node.row === child.row && node.column === child.column
            );
            if (!exists) {
              children.push(child);
            }
          });
      }
    }
  }
  return tree;
};
