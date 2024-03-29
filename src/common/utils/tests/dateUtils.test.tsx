import DateUtils from '../dateUtils';
import dayjs from 'dayjs';

describe('Date Utils', () => {
  describe('isTodayDate', () => {
    it('should return true if the date is today', () => {
      const result = DateUtils.isTodayDate(dayjs().format());
      expect(result).toBeTruthy();
    });

    it('should return false if the date is not today', () => {
      const result = DateUtils.isTodayDate(dayjs().add(-1, 'day').format());
      expect(result).toBeFalsy();
    });

    it('should return false if undefined value is provided', () => {
      const result = DateUtils.isTodayDate(undefined);
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

  describe('getDateLabel', () => {
    it('should return empty string if null is provided', () => {
      const result = DateUtils.getDateLabel(null);
      expect(result).toEqual('');
    });

    it('should return today label', () => {
      const result = DateUtils.getDateLabel(dayjs().toDate());
      expect(result).toEqual('Today');
    });

    xit('should return tomorrow label', () => {
      const result = DateUtils.getDateLabel(dayjs().add(-2, 'day').toDate());
      expect(result).toEqual('Tomorrow');
    });

    it('should return date label', () => {
      const result = DateUtils.getDateLabel(dayjs().add(2, 'day').toDate());
      expect(result.length > 3).toBeTruthy();
    });
  });

  describe('isDateInThePast', () => {
    it('should return false if nothing was provided', () => {
      const result = DateUtils.isDateInThePast(null);
      expect(result).toBeFalsy();
    });

    it('should return true if the date is in the past', () => {
      const result = DateUtils.isDateInThePast(dayjs().add(-1, 'day').format());
      expect(result).toBeTruthy();
    });
  });

  describe('formatDate', () => {
    it('should format the date with default format', () => {
      const result = DateUtils.formatDate(dayjs().format());
      expect(result).toEqual('22 Nov, 2000');
    });

    it('should format the date with provided format', () => {
      const result = DateUtils.formatDate(dayjs().format(), 'DD');
      expect(result).toEqual('22');
    });
  });
});
