import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface FilterState {
  environment: string;
  showVersion: boolean;
  invertColoring: boolean;
  nameFilter: string;
  owner: string;
}

const initialState: FilterState = {
  environment: "dev",
  showVersion: false,
  invertColoring: false,
  nameFilter: "",
  owner: "RDC",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setEnvironment: (state, action: PayloadAction<string>) => {
      state.environment = action.payload;
    },
    setShowVersion: (state, action: PayloadAction<boolean>) => {
      state.showVersion = action.payload;
    },
    setInvertColoring: (state, action: PayloadAction<boolean>) => {
      state.invertColoring = action.payload;
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
  },
});

export const {
  setEnvironment,
  setShowVersion,
  setInvertColoring,
  setNameFilter,
  setOwner,
} = filterSlice.actions;

const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
