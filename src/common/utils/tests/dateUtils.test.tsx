import DateUtils from '../dateUtils';
import dayjs from 'dayjs';

describe('Date Utils', () => {
  describe('isTodayDate', () => {
    it('should return true if the date is today', () => {
      const result = DateUtils.isTodayDate(dayjs().format());
      expect(result).toBeTruthy();
    });

    it('should return false if the date is not today', () => {
      const result = DateUtils.isTodayDate(dayjs().add(1, 'day').format());
      expect(result).toBeFalsy();
    });
  });

  describe('getDateDifference', () => {
    it('should return the date difference', () => {
      const date = dayjs().add(1, 'day');
      const result = DateUtils.getDateDifference(date.format());
      expect(result).toEqual(-1);
    });

    it('should return the date difference for yesterday', () => {
      const date = dayjs().add(-1, 'day');
      const result = DateUtils.getDateDifference(date.format());
      expect(result).toEqual(1);
    });
  });
});
