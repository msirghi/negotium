import reducer, { addTaskToList, markTaskAsDone, removeTaskFromList, setProjectTasks, setTasksList } from './tasksSlice';
import { TasksMock } from '../../common/tests/mockData/tasks-mock';

describe('Tasks slice', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, { type: 'type' });
    expect(result).toEqual({ tasks: [], projectTasks: [] });
  });

  it('should handle tasks list set', () => {
    const result = reducer({ tasks: [], projectTasks: [] }, setTasksList(TasksMock));
    expect(result).toEqual({ tasks: TasksMock, projectTasks: [] });
  });

  it('should handle add task', () => {
    const initialTasksLength = TasksMock.length;
    const result = reducer({ tasks: TasksMock, projectTasks: [] }, addTaskToList(TasksMock[0]));
    expect(result.tasks).toHaveLength(initialTasksLength + 1);
  });

  it('should handle mark task as done', () => {
    const result = reducer({ tasks: TasksMock, projectTasks: [] }, markTaskAsDone(TasksMock[0].id));
    expect(result.tasks.find((t) => t.id === TasksMock[0].id)!.completed).toBeFalsy();
  });

  it('should handle task removal from state', () => {
    const result = reducer({ tasks: TasksMock, projectTasks: [] }, removeTaskFromList(TasksMock[0].id));
    expect(result.tasks).toHaveLength(TasksMock.length - 1);
  });

  it('should set project tasks', () => {
    const result = reducer({ tasks: TasksMock, projectTasks: [] }, setProjectTasks(TasksMock));
    expect(result.projectTasks).toHaveLength(TasksMock.length);
  });
});
