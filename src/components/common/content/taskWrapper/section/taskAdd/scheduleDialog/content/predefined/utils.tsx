import { PREDEFINED_CODES } from './types';
import dayjs from 'dayjs';

const getDateForOption = (option: PREDEFINED_CODES) => {
  if (option === PREDEFINED_CODES.TODAY) {
    return dayjs().toDate();
  }
  return dayjs().add(1, 'day').toDate();
};

const PredefinedOptionsUtils = {
  getDateForOption,
};

export default PredefinedOptionsUtils;
