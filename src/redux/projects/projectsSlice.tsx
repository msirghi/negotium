import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../../common/types/projects.types';

export interface ProjectsState {
  projects: IProject[];
}

const initialState: ProjectsState = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsList: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    removeProjectFromList: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProjectsList, removeProjectFromList } = projectsSlice.actions;

export default projectsSlice.reducer;
