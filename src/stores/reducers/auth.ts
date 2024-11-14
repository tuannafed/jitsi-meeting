import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserProps = {
  data: null;
  isLoadedToken: boolean;
};
const initialState: TUserProps = {
  data: null,
  isLoadedToken: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<null>) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
