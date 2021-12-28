import { Nullable } from './common.types';

export type Task = {
  id: string;
  _id?: string;
  title: string;
  createdDate: string;
  completed: boolean;
  dueDate?: Nullable<string>;
  orderNumber?: number;
  projectId?: string;
  description?: string;
  sectionId?: string;
};

export type Section = {
  id: string;
  _id?: string;
  title: string;
  projectId: string;
} & Pick<Task, 'orderNumber'>;
