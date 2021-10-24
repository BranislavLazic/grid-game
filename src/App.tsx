import React, { useState } from 'react';
import styles from './App.module.css';
import { Grid } from './components/Grid';
import { GridProvider } from './context/GridProvider';

function App() {
  const generateRandomGrid = (size: number) => {
    let grid = [];
    for (let i = 0; i < 5; i++) {
      let randomRow = Math.floor(Math.random() * 31 + 1).toString(2);
      while (randomRow.length < size) {
        randomRow = '0' + randomRow;
      }
      const row = [...randomRow].map((value) => Number(value));
      grid.push(row);
    }
    return grid;
  };

  const [grid, setGrid] = useState(generateRandomGrid(5));

  const handleRandomize = () => {
    setGrid(generateRandomGrid(5));
  };

  return (
    <GridProvider>
      <div className={styles.mainContainer}>
        <h2>Grid game</h2>
        <Grid grid={grid} />
        <button onClick={handleRandomize}>Randomize</button>
      </div>
    </GridProvider>
  );
}

export default App;
