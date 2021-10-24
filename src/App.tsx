import React, { useState } from 'react';
import { Grid } from './components/Grid';
import Slider from 'rc-slider';
import { GridProvider } from './context/GridProvider';
import styles from './App.module.css';
import 'rc-slider/assets/index.css';

function App() {
  const generateRandomGrid = (size: number) => {
    let grid = [];
    for (let i = 0; i < size; i++) {
      let randomRowValues = Math.floor(
        Math.random() * Math.pow(2, size)
      ).toString(2);
      while (randomRowValues.length < size) {
        randomRowValues = '0' + randomRowValues;
      }
      const row = [...randomRowValues].map((value) => Number(value));
      grid.push(row);
    }
    return grid;
  };

  const [grid, setGrid] = useState(generateRandomGrid(10));

  const handleRandomize = () => {
    setGrid(generateRandomGrid(10));
  };

  return (
    <GridProvider>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <h2>Grid game</h2>
          <Grid grid={grid} />
          <Slider min={5} max={10} step={1} />
          <button onClick={handleRandomize}>Randomize</button>
        </div>
      </div>
    </GridProvider>
  );
}

export default App;
