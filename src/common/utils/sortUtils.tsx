import { ISection, ITask } from '../types/tasks.types';

const sortSectionsByOrder = (sections: ISection[]) => {
  return sections.sort((s1, s2) => s1.orderNumber! - s2.orderNumber!);
};

const sortByDate = (tasks: ITask[]) => {
  return tasks.sort(
    (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
  );
};

const SortUtils = {
  sortSectionsByOrder,
  sortByDate,
};

export default SortUtils;
