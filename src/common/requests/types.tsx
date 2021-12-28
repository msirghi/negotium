import { Project } from '../types/projects.types';
import { Section, Task } from '../types/tasks.types';

export interface IGetProjectResponse {
  projects: Project[];
}

export interface IGetTasksResponse {
  tasks: Task[];
}

export interface IGetTasksWithSectionResponse {
  data: Section[];
}

export enum HttpMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}
