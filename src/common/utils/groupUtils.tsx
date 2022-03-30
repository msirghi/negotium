import { Task } from '../types/tasks.types';
import groupBy from 'lodash.groupBy';
import dayjs from 'dayjs';

const groupTasksByDay = (tasks: Task[]): { date: string; tasks: Task[] }[] => {
  const groupedTasks = groupBy(tasks, (task) => {
    return dayjs(task.dueDate).startOf('day').format();
  });

  console.log('groupedTasks', groupedTasks);
  return Object.keys(groupedTasks).map((key) => ({ date: key, tasks: groupedTasks[key] }));
};

const GroupUtils = {
  groupTasksByDay,
};

export default GroupUtils;
