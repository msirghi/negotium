import { ITask } from '../common/types/tasks.types';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import Requests from '../common/requests/request';
import { HttpMethod } from '../common/requests/types';
import dayjs from 'dayjs';

const createTask = (task: Omit<ITask, 'id'>) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks`,
    HttpMethod.POST,
    task
  );
};

const markTaskAsDone = (id: ITask['id']) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      completed: true,
    }
  );
};

const updateTaskName = (id: ITask['id'], title: ITask['title']) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      title,
    }
  );
};

const updateTaskDescription = (
  id: ITask['id'],
  description: ITask['description']
) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      description,
    }
  );
};

const updateTaskDueDate = (id: ITask['id'], dueDate: ITask['dueDate']) => {
  let validatedDate = null;
  if (dayjs(dueDate).isValid()) {
    validatedDate = dueDate;
  }
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      dueDate: validatedDate,
    }
  );
};

const TaskService = {
  createTask,
  markTaskAsDone,
  updateTaskName,
  updateTaskDueDate,
  updateTaskDescription
};

export default TaskService;
