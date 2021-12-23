import TaskUtils from './TaskUtils';
import TaskService from '../../../../services/TaskService';
import { ITask } from '../../../../common/types/tasks.types';

describe('TaskUtils', () => {
  describe('getNewTaskObject', () => {
    it('should return new task without the id', () => {
      const result = TaskUtils.getNewTaskObject('title', null, 1);
      expect((result as any).id).toBeUndefined();
    });

    it('should return new task with defined date', () => {
      const result = TaskUtils.getNewTaskObject('title', new Date(), 1);
      expect(result.dueDate).toBeDefined();
    });
  });

  describe('markAsDone', () => {
    it('should call task service to mark as done and fire callback', async () => {
      TaskService.markTaskAsDone = jest.fn(() => Promise.resolve({})) as any;
      const spy = jest.fn();
      await TaskUtils.markAsDone('id', spy);
      expect(TaskService.markTaskAsDone).toBeCalled();
      expect(spy).toBeCalled();
    });
  });

  describe('getMaxTaskOrderNumber', () => {
    it('should return 0 if no items were found after filtration', () => {
      expect(TaskUtils.getMaxTaskOrderNumber([])).toEqual(0);
    });

    it('should return max orderNumber from tasks array', () => {
      const tasks = [
        { orderNumber: 1 },
        { orderNumber: 2 },
      ] as unknown as ITask[];
      expect(TaskUtils.getMaxTaskOrderNumber(tasks)).toEqual(2);
    });

    it('should return 0 if max orderNumber was not found', () => {
      const tasks = [
        { orderNumber: 0 },
        { orderNumber: 0 },
      ] as unknown as ITask[];
      expect(TaskUtils.getMaxTaskOrderNumber(tasks)).toEqual(0);
    });
  });
});
