import { IProject } from '../types/projects.types';
import { ISection, ITask } from '../types/tasks.types';

export interface IGetProjectResponse {
  projects: IProject[];
}

export interface IGetTasksResponse {
  tasks: ITask[];
}

export interface IGetTasksWithSectionResponse {
  data: ISection[];
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
