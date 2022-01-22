import { Section, Task } from '../types/tasks.types';
import { Note } from '../types/notes.types';

const sortByOrder = (list: Section[] | Task[]) => {
  return list.sort((s1, s2) => s1.orderNumber! - s2.orderNumber!);
};

const sortSectionsByOrder = (sections: Section[]) => {
  return sortByOrder(sections);
};

const sortItemsByOrder = (items: Task[]) => {
  return sortByOrder(items);
};

const sortByDate = (tasks: Task[]) => {
  return tasks.sort((a, b) => {
    if (!b.dueDate) {
      return 1;
    }
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  });
};

const sortNotesByUpdatedDate = (notes: Note[]) => {
  return notes.sort((a, b) => {
    if (!b.updatedDate) {
      return 1;
    }
    return (
      new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime()
    );
  });
};

const SortUtils = {
  sortSectionsByOrder,
  sortByDate,
  sortItemsByOrder,
  sortNotesByUpdatedDate
};

export default SortUtils;
