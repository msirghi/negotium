import { Project } from '../types/projects.types';
import { Section, Task } from '../types/tasks.types';

export interface GetProjectResponse {
  projects: Project[];
}

export interface GetTasksResponse {
  tasks: Task[];
}

export interface GetTasksWithSectionResponse {
  data: Section[];
}
