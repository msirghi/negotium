export type ITask = {
  id: string;
  title: string;
  createdDate: string;
  completed: boolean;
  dueDate?: string;
  orderNumber?: number;
};

export type ISection = {
  id: string;
  sectionTitle: string;
  sectionTasks: ITask[];
} & Pick<ITask, 'orderNumber'>;
