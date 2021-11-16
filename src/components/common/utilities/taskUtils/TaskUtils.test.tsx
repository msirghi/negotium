import TaskUtils from './TaskUtils';
import TaskService from '../../../../services/TaskService';

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
});
