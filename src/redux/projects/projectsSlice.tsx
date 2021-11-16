import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../../common/types/projects.types';

export interface ProjectsState {
  projects: IProject[];
}

const initialState: ProjectsState = {
  projects: [],
};

export const counterSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsList: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjectsList } = counterSlice.actions;

export default counterSlice.reducer;
