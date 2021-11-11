import { ISection } from '../../types/tasks.types';
import SortUtils from '../sortUtils';

describe('Sort Utils', () => {
  describe('sortSectionsByOrder', () => {
    it('should return sorted sections array by order number', () => {
      const input: ISection[] = [
        {
          id: '1',
          orderNumber: 2,
          sectionTasks: [],
          sectionTitle: 'Title',
        },
        {
          id: '2',
          orderNumber: 1,
          sectionTasks: [],
          sectionTitle: 'Title',
        },
      ];
      const result = SortUtils.sortSectionsByOrder(input);
      expect(result[0].id).toEqual('2');
      expect(result[1].id).toEqual('1');
    });
  });
});
