import Requests from '../../common/requests/request';
import ProjectService from '../ProjectService';
import { projectsMock } from '../../common/tests/mockData/projects-mock';

describe('ProjectService', () => {
  beforeEach(() => {
    Requests.restApiCallWithBearer = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a call to create a new project', async () => {
    await ProjectService.addProject(projectsMock[0]);
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a call to get project by id', async () => {
    await ProjectService.getProjectById(projectsMock[0].id);
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a call to delete project by id', async () => {
    await ProjectService.deleteProjectById(projectsMock[0].id);
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });

  it('should make a call to updated project name by id', async () => {
    await ProjectService.updateProjectName(projectsMock[0].id, 'name');
    expect(Requests.restApiCallWithBearer).toBeCalled();
  });
});
