import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../common/types/tasks.types';

export interface TasksState {
  tasks: ITask[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksList: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((p) => p.id !== action.payload);
    },
  },
});

export const { removeTaskFromList, setTasksList } = tasksSlice.actions;

export default tasksSlice.reducer;
