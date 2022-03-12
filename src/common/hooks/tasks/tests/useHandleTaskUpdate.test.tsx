import { renderHook } from '@testing-library/react-hooks';
import { TasksMock } from '../../../tests/mockData/tasks-mock';
import { MockReduxProvider } from '../../../tests/TestUtils';
import { useHandleTaskUpdate } from '../useHandleTaskUpdate';
import ProjectService from '../../../../services/ProjectService';
import { tasksRequests } from '../../../requests/tasksRequests';

describe('useHandleTaskUpdate', () => {
  beforeEach(() => {
    jest.spyOn(ProjectService, 'updateProjectTask').mockImplementation();
    jest.spyOn(tasksRequests, 'fetchTasksByProject').mockImplementation(() => Promise.resolve(TasksMock));
    jest.spyOn(ProjectService, 'addProjectTask').mockImplementation();
  });

  afterEach(jest.clearAllMocks);

  const reduxStore = { tasks: { tasks: TasksMock } };
  const componentWithRedux = ({ children }: any) => <MockReduxProvider reduxStore={reduxStore}>{children}</MockReduxProvider>;

  it('should mark the task as done', async () => {
    const { result } = renderHook(() => useHandleTaskUpdate(), { wrapper: componentWithRedux });
    await result.current.setProjectId('id');
    await result.current.fetchTasks();
    await result.current.markTaskAsDone(TasksMock[0].id);
    expect(ProjectService.updateProjectTask).toBeCalled();
  });

  it('should handle task add', async () => {
    const { result } = renderHook(() => useHandleTaskUpdate(), { wrapper: componentWithRedux });
    await result.current.setProjectId('id');
    await result.current.fetchTasks();
    await result.current.addTask(TasksMock[0].title, null);
    expect(ProjectService.addProjectTask).toBeCalled();
  });

  it('should handle task add with section', async () => {
    const { result } = renderHook(() => useHandleTaskUpdate(), { wrapper: componentWithRedux });
    await result.current.setProjectId('id');
    await result.current.fetchTasks();
    await result.current.addTask(TasksMock[0].title, null, 'section');
    expect(ProjectService.addProjectTask).toBeCalled();
  });

  it('should handle task update', async () => {
    const { result } = renderHook(() => useHandleTaskUpdate(), { wrapper: componentWithRedux });
    await result.current.setProjectId('id');
    await result.current.fetchTasks();
    await result.current.updateTask(TasksMock[0]);
    expect(ProjectService.updateProjectTask).toBeCalled();
  });

  it('should not fetch tasks if there is no project id', async () => {
    const { result } = renderHook(() => useHandleTaskUpdate(), { wrapper: componentWithRedux });
    result.current.setProjectId('');
    await result.current.fetchTasks();
    expect(tasksRequests.fetchTasksByProject).not.toBeCalled();
  });

  it('should fetch tasks if project id is defined', async () => {
    const { result } = renderHook(() => useHandleTaskUpdate(), { wrapper: componentWithRedux });
    result.current.setProjectId('project');
    await result.current.fetchTasks();
    expect(tasksRequests.fetchTasksByProject).toBeCalled();
  });
});
