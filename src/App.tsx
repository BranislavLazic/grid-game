import React, { useState } from 'react';
import { Grid } from './components/Grid';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import { GridProvider } from './context/GridProvider';
import styles from './App.module.css';

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

const App = () => {
  const defaultSize = 5;
  const [gridSize, setGridSize] = useState(defaultSize);
  const [grid, setGrid] = useState(generateRandomGrid(gridSize));

  const handleGenerate = () => {
    setGrid(generateRandomGrid(gridSize));
  };

  const handleSliderChange = (
    e: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setGridSize(Number(value));
  };

  return (
    <GridProvider>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <h2>Grid game</h2>
          <Grid grid={grid} />
          <span>Size</span>
          <Slider
            defaultValue={defaultSize}
            step={1}
            min={defaultSize}
            max={30}
            onChange={handleSliderChange}
            getAriaValueText={(v: number) => v.toString()}
            valueLabelDisplay='auto'
          />
          <Button variant='contained' onClick={handleGenerate}>
            Generate
          </Button>
        </div>
      </div>
    </GridProvider>
  );
};

export default App;
