import Requests from '../../common/requests/request';
import { AxiosResponse } from 'axios';
import TaskService from '../TaskService';
import { ITask } from '../../common/types/tasks.types';

describe('TaskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a request to create a new task', async () => {
    Requests.restApiCall = jest.fn(() => Promise.resolve({} as AxiosResponse));
    await TaskService.createTask({} as ITask);
    expect(Requests.restApiCall).toBeCalled();
  });

  it('should make a request to mark task as done', async () => {
    Requests.restApiCall = jest.fn(() => Promise.resolve({} as AxiosResponse));
    await TaskService.markTaskAsDone('1');
    expect(Requests.restApiCall).toBeCalled();
  });

  it('should make a request to update tasks name', async () => {
    Requests.restApiCall = jest.fn(() => Promise.resolve({} as AxiosResponse));
    await TaskService.updateTaskName('1', 'new name');
    expect(Requests.restApiCall).toBeCalled();
  });

  it('should make a request to update tasks due date', async () => {
    Requests.restApiCall = jest.fn(() => Promise.resolve({} as AxiosResponse));
    await TaskService.updateTaskDueDate('1', '2020-12-12');
    expect(Requests.restApiCall).toBeCalled();
  });

  it('should make a request to update tasks with invalid due date', async () => {
    Requests.restApiCall = jest.fn(() => Promise.resolve({} as AxiosResponse));
    await TaskService.updateTaskDueDate('1', 'Invalid');
    expect(Requests.restApiCall).toBeCalled();
  });
});
