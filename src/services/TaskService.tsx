import { ITask } from '../common/types/tasks.types';
import { BASE_API_URL } from '../common/constants/constants';
import Requests from '../common/requests/request';
import { HttpMethod } from '../common/requests/types';

const createTask = (task: Omit<ITask, 'id'>) => {
  return Requests.restApiCall(`${BASE_API_URL}/tasks`, HttpMethod.POST, task);
};

const markTaskAsDone = (id: ITask['id']) => {
  return Requests.restApiCall(`${BASE_API_URL}/tasks/${id}`, HttpMethod.PATCH, {
    completed: true,
  });
};

const updateTaskName = (id: ITask['id'], title: ITask['title']) => {
  return Requests.restApiCall(`${BASE_API_URL}/tasks/${id}`, HttpMethod.PATCH, {
    title,
  });
};

const TaskService = {
  createTask,
  markTaskAsDone,
  updateTaskName,
};

export default TaskService;
