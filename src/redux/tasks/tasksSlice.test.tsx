import reducer, { removeTaskFromList, setTasksList } from './tasksSlice';
import { TasksMock } from '../../common/tests/mockData/tasks-mock';

describe('Tasks slice', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, { type: 'type' });

    expect(result).toEqual({
      tasks: [],
    });
  });

  it('should handle tasks list set', () => {
    const result = reducer({ tasks: [] }, setTasksList(TasksMock));

    expect(result).toEqual({
      tasks: TasksMock,
    });
  });

  it('should handle task removal from state', () => {
    const result = reducer(
      { tasks: TasksMock },
      removeTaskFromList(TasksMock[0].id)
    );

    expect(result.tasks).toHaveLength(TasksMock.length - 1);
  });
});
