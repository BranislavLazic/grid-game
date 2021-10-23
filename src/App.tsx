import React from 'react';
import './App.css';
import { Grid } from './components/Grid';

function App() {
  const grid: number[][] = [
    [0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0]
  ];
  return <Grid grid={grid} />;
}

export default App;
