import dayjs from 'dayjs';
import { Nullable } from '../types/common.types';
import { TaskDateType } from '../constants/enums';

const isTodayDate = (date?: string | null) => {
  if (!date) {
    return false;
  }

  const someDate = new Date(date);
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const getDateDifference = (date: string) => {
  const date1 = dayjs(new Date());
  return date1.diff(date, 'day');
};

const getWeekDay = (date: Date) => {
  return dayjs(date).format('ddd');
};

const getDateLabel = (date: Nullable<Date>) => {
  if (!date) {
    return '';
  }
  const newDate = dayjs(date);

  if (isTodayDate(newDate.format())) {
    return 'Today';
  }
  if (getDateDifference(newDate.add(1, 'day').format()) === -1) {
    return 'Tomorrow';
  }
  return newDate.format('D MMMM');
};

const isDateInThePast = (date?: Nullable<string>) => {
  if (!date) {
    return false;
  }
  return dayjs(date).isBefore(dayjs(), 'day');
};

const formatDate = (date: string, format?: string) => {
  const formattedDate = dayjs(date).format(format || 'DD MMM, YYYY');
  if (isNaN(new Date(formattedDate).getTime())) {
    return '';
  }
  return formattedDate;
};

const formatDateForTask = (date?: Nullable<string>, format?: string) => {
  if (!date) {
    return { value: '', type: TaskDateType.NONE };
  }
  if (isDateInThePast(date)) {
    return { value: formatDate(date, 'DD MMM'), type: TaskDateType.PAST };
  }
  if (isTodayDate(date)) {
    return { value: 'Today', type: TaskDateType.Today };
  }
  if (dayjs(date).get('year') === dayjs().get('year')) {
    return { value: formatDate(date, 'DD MMM') };
  }
  return { value: formatDate(date, format), type: TaskDateType.NONE };
};

const DateUtils = {
  isTodayDate,
  getDateDifference,
  getWeekDay,
  getDateLabel,
  isDateInThePast,
  formatDate,
  formatDateForTask,
};

export default DateUtils;
