import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { projectsMock } from '../../tests/mockData/projects-mock';
import { projectsRequests } from '../projectsRequests';
import { GetProjectResponse } from '../types';

describe('projectsRequests', () => {
  const axiosMock = new MockAdapter(axios);

  axiosMock.onGet(/projects/).reply(200, {
    data: { projects: [...projectsMock] },
  });

  it('should make a call via axios on fetching the project list', async () => {
    const data = (await projectsRequests.fetchProjects()) as unknown as {
      data: GetProjectResponse;
    };
    expect(data.data.projects).toEqual(projectsMock);
  });
});
