import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects/projectsSlice';
import accountReducer from './account/accountSlice';
import notesReducer from './notes/notesSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    account: accountReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
