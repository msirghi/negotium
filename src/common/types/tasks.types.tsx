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
};

export type ISection = {
  id: string;
  sectionTitle: string;
  sectionTasks: ITask[];
} & Pick<ITask, 'orderNumber'>;
