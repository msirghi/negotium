import { Section } from '../../types/tasks.types';
import SortUtils from '../sortUtils';
import { TasksMock } from '../../tests/mockData/tasks-mock';
import dayjs from 'dayjs';

describe('Sort Utils', () => {
  describe('sortSectionsByOrder', () => {
    it('should return sorted sections array by order number', () => {
      const input: Section[] = [
        {
          id: '1',
          orderNumber: 2,
          title: 'Title',
          projectId: '1',
        },
        {
          id: '2',
          orderNumber: 1,
          title: 'Title',
          projectId: '2',
        },
      ];
      const result = SortUtils.sortSectionsByOrder(input);
      expect(result[0].id).toEqual('2');
      expect(result[1].id).toEqual('1');
    });
  });

  describe('sortTasksByDate', () => {
    it('should sort by date', () => {
      const result = SortUtils.sortTasksByDate(TasksMock);
      expect(result[0].id).toEqual('uuid-1');
      expect(result[1].id).toEqual('uuid-2');
    });
  });

  describe('sortByDate', () => {
    const distantPast = -8639025148800000;
    it('should sort by date if date1 < date2', () => {
      const result = SortUtils.sortByDate(dayjs().toString(), dayjs().add(1, 'day').toString());
      expect(result).toBe(-86400000);
    });

    it('should sort by date if date1 > date2', () => {
      const result = SortUtils.sortByDate(dayjs().add(1, 'day').toString(), dayjs().toString());
      expect(result).toBe(86400000);
    });

    it('should sort by date if date1 = date2', () => {
      const result = SortUtils.sortByDate(dayjs().toString(), dayjs().toString());
      expect(result).toBe(0);
    });

    it('should sort by date if date1 is not valid and date2 is defined', () => {
      const result = SortUtils.sortByDate('date', dayjs().toString());
      expect(result).toBe(8639025148800000);
    });

    it('should sort by date if date2 is not valid and date1 is defined', () => {
      const result = SortUtils.sortByDate(dayjs().toString(), 'date');
      expect(result).toBe(distantPast);
    });
  });
});
