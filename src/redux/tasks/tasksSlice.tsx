import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../common/types/tasks.types';

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksList: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((p) => p.id !== action.payload);
    },
  },
});

export const { removeTaskFromList, setTasksList } = tasksSlice.actions;

export default tasksSlice.reducer;
