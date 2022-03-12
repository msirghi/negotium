import { renderHook } from '@testing-library/react-hooks';
import { useTasksActions } from '../useTasksActions';
import TaskService from '../../../../services/TaskService';
import { MockReduxProvider } from '../../../tests/TestUtils';
import { TasksMock } from '../../../tests/mockData/tasks-mock';
import taskActions from '../../../../redux/actions/loadTasks';
import TaskUtils from '../../../../components/common/utilities/taskUtils/TaskUtils';

describe('useTasksActions', () => {
  beforeEach(() => {
    jest.spyOn(TaskService, 'createTask').mockImplementation();
    jest.spyOn(TaskUtils, 'markAsDone').mockImplementation();
    // @ts-ignore
    jest.spyOn(taskActions, 'loadTasks').mockReturnValue({ type: '', payload: {} });
  });

  afterEach(jest.clearAllMocks);

  const reduxStore = { tasks: { tasks: TasksMock } };
  const componentWithRedux = ({ children }: any) => <MockReduxProvider reduxStore={reduxStore}>{children}</MockReduxProvider>;

  it('should handle task add', async () => {
    const { result } = renderHook(() => useTasksActions(), { wrapper: componentWithRedux });
    await result.current.handleTaskAdd('title', null);
    expect(TaskService.createTask).toBeCalled();
  });

  it('should handle mark task as done', async () => {
    const { result } = renderHook(() => useTasksActions(), { wrapper: componentWithRedux });
    await result.current.handleMarkTaskAsDone('id');
    expect(TaskUtils.markAsDone).toBeCalled();
  });

  it('should handle task update', () => {
    const callbackSpy = jest.fn();
    const { result } = renderHook(() => useTasksActions(), { wrapper: componentWithRedux });
    result.current.handleTaskUpdate(TasksMock[0], callbackSpy);
    expect(callbackSpy).toBeCalled();
  });
});
