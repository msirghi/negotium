import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { projectsMock } from '../../tests/mockData/projects-mock';
import { projectsRequests } from '../projectsRequests';
import { IGetProjectResponse, IGetTasksResponse } from '../types';
import { tasksRequests } from '../tasksRequests';

describe('tasksRequests', () => {
  const axiosMock = new MockAdapter(axios);

  axiosMock.onGet(/tasks/).reply(200, {
    data: { tasks: [] },
  });

  it('should make a call via axios on fetching the tasks', async () => {
    const data = (await tasksRequests.fetchTasks()) as unknown as {
      data: IGetTasksResponse;
    };
    expect(data.data.tasks).toEqual([]);
  });

  it('should make a call via axios on fetching the task with filter query', async () => {
    const data =
      (await tasksRequests.fetchTasksGroupedBySection()) as unknown as {
        data: IGetTasksResponse;
      };
    expect(data.data.tasks).toEqual([]);
  });

  it('should fetch tasks by project', async () => {
    const data = (await tasksRequests.fetchTasksByProject(
      'project'
    )) as unknown as {
      data: IGetTasksResponse;
    };
    expect(data.data.tasks).toEqual([]);
  });
});
