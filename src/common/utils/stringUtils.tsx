import dayjs from 'dayjs';

const taskInputKeywords = ['!today', '!tomorrow'];

const getTaskInputDateByKeywords = (value: string) => {
  const foundKeyword = taskInputKeywords.find((kw) =>
    value.toLowerCase().includes(kw)
  );
  if (foundKeyword) {
    const modifiedInputValue = value
      .split(' ')
      .filter((word) => word.toLowerCase() !== foundKeyword)
      .join(' ');
    if (foundKeyword === '!today') {
      return { value: modifiedInputValue, date: dayjs().format() };
    }
    return { value: modifiedInputValue, date: dayjs().add(1, 'day').format() };
  }
  return { value, date: null };
};

const getPageTitle = (title: string) => `${title} | Negotium`;

const StringUtils = {
  getTaskInputDateByKeywords,
  getPageTitle
};

export default StringUtils;
