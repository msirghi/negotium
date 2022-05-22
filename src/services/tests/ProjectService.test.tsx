import Requests from '../../common/requests/request';
import ProjectService from '../ProjectService';
import { projectsMock } from '../../common/tests/mockData/projects-mock';
import ServiceResultFactory from '../../common/requests/serviceResultFactory';
import { TasksMock } from '../../common/tests/mockData/tasks-mock';

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

  describe('addProjectTask', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.addProjectTask('projectId', TasksMock[0]);
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.addProjectTask('projectId', TasksMock[0]);
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('updateProjectTask', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.updateProjectTask('projectId', TasksMock[0]);
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.updateProjectTask('projectId', TasksMock[0]);
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('updateProjectTaskDescription', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.updateProjectTaskDescription(
        'projectId',
        TasksMock[0].id,
        'desc'
      );
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.updateProjectTaskDescription(
        'projectId',
        TasksMock[0].id,
        'desc'
      );
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('addProjectSection', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.addProjectSection('projectId', 'desc');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.addProjectSection('projectId', 'desc');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('getProjectSections', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.getProjectSections('projectId');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.getProjectSections('projectId');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('updateProjectSectionTitle', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.updateProjectSectionTitle('projectId', 'sectionId', 'title');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.updateProjectSectionTitle('projectId', 'sectionId', 'title');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('deleteProjectSection', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.deleteProjectSection('projectId', 'sectionId');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.deleteProjectSection('projectId', 'sectionId');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('updateProjectColor', () => {
    it('should handle api request', async () => {
      Requests.restApiCallWithBearer = jest.fn();
      await ProjectService.updateProjectColor('projectId', 'color');
      expect(Requests.restApiCallWithBearer).toBeCalled();
    });
  });

  describe('getAllProjectTasks', () => {
    it('should handle success response', async () => {
      jest.spyOn(ServiceResultFactory, 'fromError').mockImplementation();
      ServiceResultFactory.fromResponse = jest.fn(() => Promise.resolve() as any);
      ServiceResultFactory.convertMongoIdToJSId = jest.fn(() => Promise.resolve() as any);
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await ProjectService.getAllProjectTasks();
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      // @ts-ignore
      ServiceResultFactory.fromError = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await ProjectService.getAllProjectTasks();
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });
});
