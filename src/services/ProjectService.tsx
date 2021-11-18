import Requests from '../common/requests/request';
import { BASE_API_URL } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';
import { IProject } from '../common/types/projects.types';

const addProject = (project: Omit<IProject, 'id'>) => {
  return Requests.restApiCall(`${BASE_API_URL}/projects`, HttpMethod.POST, {
    ...project,
  });
};

const getProjectById = (projectId: IProject['id']) => {
  return Requests.restApiCall(
    `${BASE_API_URL}/projects/${projectId}`,
    HttpMethod.GET
  );
};

const updateProjectName = (
  projectId: IProject['id'],
  name: IProject['name']
) => {
  return Requests.restApiCall(
    `${BASE_API_URL}/projects/${projectId}`,
    HttpMethod.PATCH,
    { name }
  );
};

const deleteProjectById = (projectId: IProject['id']) => {
  return Requests.restApiCall(
    `${BASE_API_URL}/projects/${projectId}`,
    HttpMethod.DELETE
  );
};

const ProjectService = {
  addProject,
  getProjectById,
  updateProjectName,
  deleteProjectById
};

export default ProjectService;
