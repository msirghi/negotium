import { Section } from '../../types/tasks.types';
import SortUtils from '../sortUtils';
import { TasksMock } from '../../tests/mockData/tasks-mock';

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

  describe('sortByDate', () => {
    it('should sort by date', () => {
      const result = SortUtils.sortByDate(TasksMock);
      expect(result[0].id).toEqual('uuid-1');
      expect(result[1].id).toEqual('uuid-2');
    });
  });
});
