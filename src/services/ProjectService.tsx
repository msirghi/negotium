import Requests from '../common/requests/request';
import { BASE_API_URL, BASE_API_URL_V1 } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';
import { IProject } from '../common/types/projects.types';

const addProject = (project: Omit<IProject, 'id'>) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects`, HttpMethod.POST, {
    ...project,
    color: '#ffffff'
  });
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
};

export default ProjectService;
