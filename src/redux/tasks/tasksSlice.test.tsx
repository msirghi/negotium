import reducer, { addTaskToList, markTaskAsDone, removeTaskFromList, setTasksList } from './tasksSlice';
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

  it('should handle add task', () => {
    const initialTasksLength = TasksMock.length;
    const result = reducer({ tasks: TasksMock }, addTaskToList(TasksMock[0]));
    expect(result.tasks).toHaveLength(initialTasksLength + 1);
  });

  it('should handle mark task as done', () => {
    const result = reducer({ tasks: TasksMock }, markTaskAsDone(TasksMock[0].id));
    expect(result.tasks.find((t) => t.id === TasksMock[0].id)!.completed).toBeTruthy();
  });

  it('should handle task removal from state', () => {
    const result = reducer({ tasks: TasksMock }, removeTaskFromList(TasksMock[0].id));
    expect(result.tasks).toHaveLength(TasksMock.length - 1);
  });
});
