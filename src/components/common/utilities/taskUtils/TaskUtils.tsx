import { ITask } from '../../../../common/types/tasks.types';
import dayjs from 'dayjs';
import { Nullable } from '../../../../common/types/common.types';
import TaskService from '../../../../services/TaskService';

const getNewTaskObject = (
  title: string,
  date: Nullable<Date>,
  orderNumber: number
) => {
  const newTask: Omit<ITask, 'id'> = {
    title,
    orderNumber,
    createdDate: dayjs().format(),
    dueDate: date ? dayjs(date).format() : null,
    completed: false,
  };
  return newTask;
};

const markAsDone = async (taskId: string, callback: () => void) => {
  await TaskService.markTaskAsDone(taskId);
  await callback();
};

const TaskUtils = {
  getNewTaskObject,
  markAsDone,
};

export default TaskUtils;
