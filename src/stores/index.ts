import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/app';
import { authReducer } from './reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

export const globalStore = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
