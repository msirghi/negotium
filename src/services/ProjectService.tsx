import Requests from '../common/requests/request';
import { BASE_API_URL } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';
import { IProject } from '../common/types/projects.types';

const addProject = (project: Omit<IProject, 'id'>) => {
  return Requests.restApiCall(`${BASE_API_URL}/projects`, HttpMethod.POST, {
    ...project,
  });
};

const ProjectService = {
  addProject,
};

export default ProjectService;
