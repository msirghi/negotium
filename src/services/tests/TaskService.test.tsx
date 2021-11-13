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
});
