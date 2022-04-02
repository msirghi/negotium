import { Task } from '../../../../common/types/tasks.types';
import dayjs from 'dayjs';
import { Nullable } from '../../../../common/types/common.types';
import TaskService from '../../../../services/TaskService';

const getNewTaskObject = (
  title: string,
  date: Nullable<Date>,
  orderNumber: number,
  projectId?: string
) => {
  const newTask: Omit<Task, 'id'> = {
    title,
    orderNumber,
    createdDate: dayjs().format(),
    dueDate: date ? dayjs(date).format() : null,
    completed: false,
    projectId,
  };
  return newTask;
};

const getMaxTaskOrderNumber = (tasks: Task[]) => {
  const filtered = tasks.filter((p) => !p.completed && !p.projectId);
  if (!filtered.length) {
    return 0;
  }

  const maxTaskOrder = Math.max.apply(
    Math,
    filtered.map((t) => t.orderNumber!)
  );
  if (!maxTaskOrder) {
    return 0;
  }
  return maxTaskOrder;
};

const markAsDone = async (taskId: string, completed = true) => {
  await TaskService.markTaskAsDone(taskId, completed);
};

const TaskUtils = {
  getNewTaskObject,
  markAsDone,
  getMaxTaskOrderNumber,
};

export default TaskUtils;
