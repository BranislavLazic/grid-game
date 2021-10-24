import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';

type CellPosition = { row: number; column: number };

interface IGridContext {
  selectedCell: CellPosition;
  setSelectedCell: Dispatch<SetStateAction<CellPosition>>;
  connectedNodes: CellPosition[];
  setConnectedNodes: Dispatch<SetStateAction<CellPosition[]>>;
}

const defaultState = {
  selectedCell: { row: 0, column: 0 },
  connectedNodes: [],
  setSelectedCell: () => {},
  setConnectedNodes: () => {},
};
const GridContext = createContext<IGridContext>(defaultState);

type Props = { children: React.ReactNode };

const GridProvider: React.FC<Props> = ({ children }) => {
  const [selectedCell, setSelectedCell] = useState({ row: -1, column: -1 });
  const [connectedNodes, setConnectedNodes] = useState<CellPosition[]>([]);

  const value = useMemo(
    () => ({
      selectedCell,
      setSelectedCell,
      connectedNodes,
      setConnectedNodes,
    }),
    [selectedCell, setSelectedCell, connectedNodes, setConnectedNodes],
  );

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

const useGridContext = () => useContext(GridContext);

export { useGridContext, GridProvider };
