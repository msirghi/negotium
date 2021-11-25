import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/projectsSlice';
import accountReducer from './account/accountSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
