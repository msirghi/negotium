import { ITask } from '../../../../common/types/tasks.types';
import dayjs from 'dayjs';
import { NullableDate } from '../../../../common/types/common.types';
import {SNACKBAR_POSITIONS} from "../../../../common/constants/constants";
import TaskService from "../../../../services/TaskService";

const getNewTaskObject = (
  title: string,
  date: NullableDate,
  orderNumber: number
) => {
  const newTask: Omit<ITask, 'id'> = {
    title,
    orderNumber,
    createdDate: dayjs().format(),
    dueDate: date ? dayjs(date as unknown as Date).format() : '',
    completed: false,
  };
  return newTask;
};

const markAsDone =async  (taskId: string, callback: () => void) => {
  await TaskService.markTaskAsDone(taskId);
  await callback();
}

const TaskUtils = {
  getNewTaskObject,
  markAsDone
};

export default TaskUtils;
