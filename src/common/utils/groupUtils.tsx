import { Task, TimelineGroup } from '../types/tasks.types';
// @ts-ignore
import groupBy from 'lodash.groupBy';
import dayjs from 'dayjs';
import SortUtils from './sortUtils';

const groupTasksByDay = (tasks: Task[]): TimelineGroup[] => {
  const groupedTasks = groupBy(tasks, (task) => dayjs(task.dueDate).startOf('day').format());
  const modifiedTasks = Object.keys(groupedTasks).map((key) => ({ date: key, tasks: groupedTasks[key] }));
  return modifiedTasks.sort((i, y) => SortUtils.sortByDate(i.date, y.date));
};

const GroupUtils = {
  groupTasksByDay,
};

export default GroupUtils;
