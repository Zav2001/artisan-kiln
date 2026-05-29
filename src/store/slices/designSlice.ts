import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GRID_SIZE } from "@/constants/tiles";
import { GridCell, TilePatternId } from "@/types";

interface DesignState {
  grid: GridCell[][];
  selectedPaletteTile: TilePatternId | null;
  eraseMode: boolean;
}

function createEmptyGrid(): GridCell[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null),
  );
}

const initialState: DesignState = {
  grid: createEmptyGrid(),
  selectedPaletteTile: null,
  eraseMode: false,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    selectPaletteTile: (state, action: PayloadAction<TilePatternId | null>) => {
      state.selectedPaletteTile = action.payload;
      if (action.payload) state.eraseMode = false;
    },
    setEraseMode: (state, action: PayloadAction<boolean>) => {
      state.eraseMode = action.payload;
      if (action.payload) state.selectedPaletteTile = null;
    },
    placeTile: (
      state,
      action: PayloadAction<{ row: number; col: number }>,
    ) => {
      if (!state.selectedPaletteTile) return;
      const { row, col } = action.payload;
      if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return;
      state.grid[row][col] = state.selectedPaletteTile;
    },
    removeTileFromGrid: (
      state,
      action: PayloadAction<{ row: number; col: number }>,
    ) => {
      const { row, col } = action.payload;
      if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return;
      state.grid[row][col] = null;
    },
    clearGrid: (state) => {
      state.grid = createEmptyGrid();
    },
  },
});

export const {
  selectPaletteTile,
  setEraseMode,
  placeTile,
  removeTileFromGrid,
  clearGrid,
} = designSlice.actions;

type DesignRootState = { design: DesignState };

export const selectDesignGrid = (state: DesignRootState) => state.design.grid;
export const selectSelectedPaletteTile = (state: DesignRootState) =>
  state.design.selectedPaletteTile;
export const selectEraseMode = (state: DesignRootState) => state.design.eraseMode;

export default designSlice.reducer;
