export type ITask = {
  id: string;
  title: string;
  createdDate: string;
  completed: boolean;
  dueDate?: string;
};

export type ISection = {
  id: string;
  sectionTitle: string;
  sectionTasks: ITask[];
};
