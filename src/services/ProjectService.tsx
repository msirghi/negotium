import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import { Project } from '../common/types/projects.types';
import { Section, Task } from '../common/types/tasks.types';
import ServiceResultFactory from '../common/requests/serviceResultFactory';
import { HttpMethod } from '../common/constants/enums';
import { GetProjectResponse } from '../common/requests/types';

const addProject = (project: Omit<Project, 'id'>) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects`, HttpMethod.POST, {
    ...project,
  });
};

const addProjectTask = (projectId: Project['id'], task: Omit<Task, 'id'>) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/tasks`, HttpMethod.POST, { ...task })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateProjectTask = (projectId: Project['id'], task: Task) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/tasks/${task.id}`, HttpMethod.PATCH, { ...task })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateProjectTaskDescription = (projectId: Project['id'], taskId: Task['id'], description: Task['description']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/tasks/${taskId}`, HttpMethod.PATCH, { description })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const getProjectById = (projectId: Project['id']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}`, HttpMethod.GET);
};

const updateProjectName = (projectId: Project['id'], name: Project['name']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}`, HttpMethod.PATCH, { name });
};

const updateProjectColor = (projectId: Project['id'], color: Project['color']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}`, HttpMethod.PATCH, { color });
};

const deleteProjectById = (projectId: Project['id']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}`, HttpMethod.DELETE);
};

const addProjectSection = (projectId: Project['id'], title: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/sections`, HttpMethod.POST, {
    title,
  })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const getProjectSections = (projectId: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/sections`, HttpMethod.GET)
    .then(ServiceResultFactory.fromResponse)
    .then((res) => ServiceResultFactory.convertMongoIdToJSId(res.data))
    .catch(ServiceResultFactory.fromError);
};

const updateProjectSectionTitle = (projectId: Project['id'], sectionId: Section['id'], title: Section['title']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/sections/${sectionId}`, HttpMethod.PATCH, { title })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const deleteProjectSection = (projectId: Project['id'], sectionId: Section['id']) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects/${projectId}/sections/${sectionId}`, HttpMethod.DELETE)
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const getProjects = () => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/projects`, HttpMethod.GET)
    .then(ServiceResultFactory.fromResponse)
    .then((res) => ServiceResultFactory.convertMongoIdToJSId(res.data))
    .catch(ServiceResultFactory.fromError);
};

const ProjectService = {
  addProject,
  getProjects,
  getProjectById,
  updateProjectName,
  deleteProjectById,
  addProjectTask,
  updateProjectTask,
  updateProjectTaskDescription,
  addProjectSection,
  getProjectSections,
  updateProjectSectionTitle,
  deleteProjectSection,
  updateProjectColor,
};
export default ProjectService;
