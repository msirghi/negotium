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
    addTaskToList: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      state.tasks.push(action.payload as Task);
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((p) => p.id !== action.payload);
    },
    markTaskAsDone: (state, action: PayloadAction<Task['id']>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      })
    }
  },
});

export const { removeTaskFromList, setTasksList, addTaskToList, markTaskAsDone } = tasksSlice.actions;

export default tasksSlice.reducer;
