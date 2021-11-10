import { IProject } from '../types/projects.types';
import {ISection, ITask} from '../types/tasks.types';

export interface IGetProjectResponse {
  projects: IProject[];
}

export interface IGetTasksResponse {
  tasks: ITask[];
}

export interface IGetTasksWithSectionResponse {
  data: ISection[];
}

