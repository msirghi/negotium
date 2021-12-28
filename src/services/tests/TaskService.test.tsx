import Requests from '../../common/requests/request';
import { AxiosResponse } from 'axios';
import TaskService from '../TaskService';
import { Task } from '../../common/types/tasks.types';

describe('TaskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a request to create a new task', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.createTask({} as Task);
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a request to mark task as done', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.markTaskAsDone('1');
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a request to update tasks name', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.updateTaskName('1', 'new name');
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a request to update tasks due date', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.updateTaskDueDate('1', '2020-12-12');
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a request to update tasks with invalid due date', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.updateTaskDueDate('1', 'Invalid');
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a request to update tasks description', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.updateTaskDescription('1', '12');
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a request to update tasks order', async () => {
    Requests.restApiCallWithBearer = jest.fn(() =>
      Promise.resolve({} as AxiosResponse)
    );
    await TaskService.updateOrderNumbers({ updatedOrderNumbers: [] });
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });
});
