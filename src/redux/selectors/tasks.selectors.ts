import { RootState } from '../store';
import {Task} from "../../common/types/tasks.types";

export const tasksSelector = (state: RootState) => state.tasks.tasks as Task[];
