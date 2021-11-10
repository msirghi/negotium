import dayjs from 'dayjs';

const isTodayDate = (date: string) => {
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

const DateUtils = {
  isTodayDate,
  getDateDifference,
};

export default DateUtils;
