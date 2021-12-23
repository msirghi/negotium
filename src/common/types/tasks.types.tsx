import {Nullable} from "./common.types";

export type ITask = {
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

export type ISection = {
  id: string;
  _id?: string;
  title: string;
  projectId: string;
} & Pick<ITask, 'orderNumber'>;
