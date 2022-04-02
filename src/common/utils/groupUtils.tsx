import { Task, TimelineGroup } from '../types/tasks.types';
import dayjs from 'dayjs';
import SortUtils from './sortUtils';

const groupBy = require('lodash.groupby');

const groupTasksByDay = (tasks: Task[]): TimelineGroup[] => {
  const groupedTasks = groupBy(tasks, (task: Task) => dayjs(task.dueDate).startOf('day').format());
  const modifiedTasks = Object.keys(groupedTasks).map((key) => ({ date: key, tasks: groupedTasks[key] }));
  return modifiedTasks.sort((i, y) => SortUtils.sortByDate(i.date, y.date));
};

const GroupUtils = {
  groupTasksByDay,
};

export default GroupUtils;
