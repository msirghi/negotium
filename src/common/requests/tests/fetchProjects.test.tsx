import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { projectsMock } from '../../tests/mockData/projects-mock';
import { projectsRequests } from '../projectsRequests';
import { IGetProjectResponse } from '../types';

describe('fetchProjects', () => {
  const axiosMock = new MockAdapter(axios);

  axiosMock.onGet(/projects/).reply(200, {
    data: { projects: [...projectsMock] },
  });

  it('should make a call via axios on return projects', async () => {
    const data = (await projectsRequests.fetchProjects()) as unknown as {
      data: IGetProjectResponse;
    };
    expect(data.data.projects).toEqual(projectsMock);
  });
});
