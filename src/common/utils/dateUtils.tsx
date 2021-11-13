import dayjs from 'dayjs';
import { NullableDate } from '../types/common.types';

const isTodayDate = (date?: string) => {
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
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[date.getDay()];
};

const getDateLabel = (date: NullableDate) => {
  if (!date) {
    return '';
  }
  const newDate = dayjs(date as unknown as Date);

  if (isTodayDate(newDate.format())) {
    return 'Today';
  }
  if (getDateDifference(newDate.add(1, 'day').format()) === -1) {
    return 'Tomorrow';
  }
  return newDate.format('D MMM');
};

const DateUtils = {
  isTodayDate,
  getDateDifference,
  getWeekDay,
  getDateLabel,
};

export default DateUtils;
