import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingItem {
  name: string;
}

export interface AppState {
  loading: LoadingItem[];
}

const initialState: AppState = {
  loading: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingItem>) => {
      state.loading = [...state.loading, { name: action.payload.name }];
    },
    destroyLoading: (state, action: PayloadAction<LoadingItem>) => {
      state.loading = state.loading.filter((obj) => obj.name != action.payload.name);
    },
  },
});

export const appReducer = appSlice.reducer;
export const appAction = appSlice.actions;
