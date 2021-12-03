import dayjs from 'dayjs';

const taskInputKeywords = ['!today', '!tomorrow'];

// TODO: add tests

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

const StringUtils = {
  getTaskInputDateByKeywords,
};

export default StringUtils;
