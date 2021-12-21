import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';
import { IProject } from '../common/types/projects.types';
import { ITask } from '../common/types/tasks.types';
import ServiceResultFactory from '../common/requests/serviceResultFactory';

const addProject = (project: Omit<IProject, 'id'>) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects`,
    HttpMethod.POST,
    {
      ...project,
      color: '#ffffff',
    }
  );
};

const addProjectTask = (projectId: IProject['id'], task: Omit<ITask, 'id'>) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects/${projectId}/tasks`,
    HttpMethod.POST,
    { ...task }
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateProjectTask = (projectId: IProject['id'], task: ITask) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects/${projectId}/tasks/${task.id}`,
    HttpMethod.PATCH,
    { ...task }
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateProjectTaskDescription = (projectId: IProject['id'], taskId: ITask['id'], description: ITask['description']) => {
  return Requests.restApiCallWithBearer(
      `${BASE_API_URL_V1}/projects/${projectId}/tasks/${taskId}`,
      HttpMethod.PATCH,
      { description }
  )
      .then(ServiceResultFactory.fromResponse)
      .catch(ServiceResultFactory.fromError);
};

const getProjectById = (projectId: IProject['id']) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects/${projectId}`,
    HttpMethod.GET
  );
};

const updateProjectName = (
  projectId: IProject['id'],
  name: IProject['name']
) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects/${projectId}`,
    HttpMethod.PATCH,
    { name }
  );
};

const deleteProjectById = (projectId: IProject['id']) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects/${projectId}`,
    HttpMethod.DELETE
  );
};

const ProjectService = {
  addProject,
  getProjectById,
  updateProjectName,
  deleteProjectById,
  addProjectTask,
  updateProjectTask,
  updateProjectTaskDescription
};

export default ProjectService;
