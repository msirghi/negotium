import TaskItemUtils from './utils';
import dayjs from 'dayjs';
import DateUtils from '../../../../../../common/utils/dateUtils';

describe('TaskItemUtils', () => {
  describe('getDateBadgeLabel', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return undefined if date is not provided', () => {
      const result = TaskItemUtils.getDateBadgeLabel();
      expect(result).toBeUndefined();
    });

    it('should return title of Today', () => {
      DateUtils.isTodayDate = jest.fn(() => true);
      const result = TaskItemUtils.getDateBadgeLabel(dayjs().format());
      expect(result?.title).toEqual('Today');
    });

    it('should return title of Tomorrow', () => {
      DateUtils.isTodayDate = jest.fn(() => false);
      DateUtils.getDateDifference = jest.fn(() => 0);
      const result = TaskItemUtils.getDateBadgeLabel(dayjs().format());
      expect(result?.title).toEqual('Tomorrow');
    });

    it('should return title of Days ago', () => {
      DateUtils.isTodayDate = jest.fn(() => false);
      DateUtils.getDateDifference = jest.fn(() => 1);
      const result = TaskItemUtils.getDateBadgeLabel(dayjs().format());
      expect(result?.title).toContain('days ago');
    });
  });
});
