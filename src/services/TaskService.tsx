import { Task } from '../common/types/tasks.types';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import Requests from '../common/requests/request';
import dayjs from 'dayjs';
import { TaskOrderUpdateDto } from '../components/common/dnd/taskWrapper/types';
import { HttpMethod } from '../common/constants/enums';

const createTask = (task: Omit<Task, 'id'>) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks`,
    HttpMethod.POST,
    task
  );
};

const markTaskAsDone = (id: Task['id']) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      completed: true,
    }
  );
};

const updateTaskName = (id: Task['id'], title: Task['title']) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      title,
    }
  );
};

const updateTaskDescription = (
  id: Task['id'],
  description: Task['description']
) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/${id}`,
    HttpMethod.PATCH,
    {
      description,
    }
  );
};

const updateTaskDueDate = (id: Task['id'], dueDate: Task['dueDate']) => {
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

const updateOrderNumbers = (dto: TaskOrderUpdateDto) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks/meta/order`,
    HttpMethod.PATCH,
    dto
  );
};

const TaskService = {
  createTask,
  markTaskAsDone,
  updateTaskName,
  updateTaskDueDate,
  updateTaskDescription,
  updateOrderNumbers,
};

export default TaskService;
