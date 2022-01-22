import { Id, Nullable, Title } from './common.types';

export interface Task extends Id<string>, Title {
  _id?: string;
  createdDate: string;
  completed: boolean;
  dueDate?: Nullable<string>;
  orderNumber?: number;
  projectId?: string;
  description?: string;
  sectionId?: string;
}

export interface Section extends Pick<Task, 'orderNumber'>, Id<string>, Title {
  _id?: string;
  title: string;
  projectId: string;
}
