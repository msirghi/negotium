import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import taskActions from '../loadTasks';

describe('loadTasks', () => {
  beforeEach(() => {
    jest.spyOn(tasksRequests, 'fetchTasks').mockImplementation(() => Promise.resolve(TasksMock));
  });

  afterEach(jest.clearAllMocks);

  it('should load tasks', async () => {
    const spy = jest.fn();
    const func = await taskActions.loadTasks();
    await func(spy);
    expect(spy).toBeCalled();
    expect(tasksRequests.fetchTasks).toBeCalled();
  });
});
