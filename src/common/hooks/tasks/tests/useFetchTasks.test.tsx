import { tasksRequests } from '../../../requests/tasksRequests';
import { TasksMock } from '../../../tests/mockData/tasks-mock';
import { renderHook } from '@testing-library/react-hooks';
import {useFetchTasks} from "../useFetchTasks";

describe('useFetchTasks', () => {
  beforeEach(() => {
    jest.spyOn(tasksRequests, 'fetchTasks').mockImplementation(() => Promise.resolve(TasksMock));
  });

  afterEach(jest.clearAllMocks);

  it('should fetch the tasks', async () => {
    const { result } = renderHook(() => useFetchTasks());
    await result.current.refetch();
    expect(tasksRequests.fetchTasks).toBeCalled();
  });
});
