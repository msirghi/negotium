import { Section, Task } from '../types/tasks.types';
import { Note } from '../types/notes.types';
import dayjs from 'dayjs';

const sortByOrder = (list: Section[] | Task[]) => {
  return list.sort((s1, s2) => s1.orderNumber! - s2.orderNumber!);
};

const sortSectionsByOrder = (sections: Section[]) => {
  return sortByOrder(sections);
};

const sortItemsByOrder = (items: Task[]) => {
  return sortByOrder(items);
};

const sortTasksByDate = (tasks: Task[]) => {
  const distantFuture = new Date(8640000000000000);
  return [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate) : distantFuture;
    const dateB = b.dueDate ? new Date(b.dueDate) : distantFuture;
    return dateA.getTime() - dateB.getTime();
  });
};

const sortByDate = (date1: string, date2: string) => {
  const distantFuture = new Date(8640000000000000);
  const dateA = date1 && dayjs(date1).isValid() ? new Date(date1) : distantFuture;
  const dateB = date2 && dayjs(date2).isValid() ? new Date(date2) : distantFuture;
  return dateA.getTime() - dateB.getTime();
};

const sortNotesByUpdatedDate = (notes: Note[]) => {
  return [...notes].sort((a, b) => {
    if (!b.updatedDate) {
      return 1;
    }
    return (
      // @ts-ignore
      new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime()
    );
  });
};

const sortByCompletedFlag = (tasks: Task[]) => {
  return [...tasks.filter(({ completed }) => !completed), ...tasks.filter(({ completed }) => completed)];
};

const SortUtils = {
  sortSectionsByOrder,
  sortTasksByDate,
  sortItemsByOrder,
  sortNotesByUpdatedDate,
  sortByCompletedFlag,
  sortByDate,
};

export default SortUtils;
