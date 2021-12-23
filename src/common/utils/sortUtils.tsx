import { ISection, ITask } from '../types/tasks.types';

const sortByOrder = (list: ISection[] | ITask[]) => {
  return list.sort((s1, s2) => s1.orderNumber! - s2.orderNumber!);
};

const sortSectionsByOrder = (sections: ISection[]) => {
  return sortByOrder(sections);
};

const sortItemsByOrder = (items: ITask[]) => {
  return sortByOrder(items);
};

const sortByDate = (tasks: ITask[]) => {
  return tasks.sort((a, b) => {
    if (!b.dueDate) {
      return 1;
    }
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  });
};

const SortUtils = {
  sortSectionsByOrder,
  sortByDate,
  sortItemsByOrder,
};

export default SortUtils;
