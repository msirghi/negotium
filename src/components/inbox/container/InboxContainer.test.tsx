import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { InboxContainer } from './InboxContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { act } from '@testing-library/react';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';

const queryClient = new QueryClient();

describe('InboxContainer', () => {
  beforeEach(() => {
    tasksRequests.fetchTasks = jest.fn(() =>
      Promise.resolve([
        ...TasksMock,
        { ...TasksMock[0], id: '1', completed: false },
      ])
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <InboxContainer />
        </SnackbarProvider>
      </QueryClientProvider>
    );
  };

  it('should fetch the tasks on mount', () => {
    mount(renderComponent());
    expect(tasksRequests.fetchTasks).toBeCalled();
  });

  it('should render content box after fetch', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(ContentBox)).toHaveLength(1);
  });

  it('should deselect the task properly', () => {
    const wrapper = mount(renderComponent());
    const taskItem = wrapper.find(TaskItem).at(0);
    act(() => {
      taskItem.props().onTaskSelect(TasksMock[0]);
    });
    wrapper.update();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    expect(selectedTaskSection.props().task).toBeDefined();
    act(() => {
      selectedTaskSection.props().deselectTask();
    });
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection).props().task).toBeNull();
  });

  it('should select the task properly', async () => {
    const wrapper = await mount(renderComponent());
    const item = wrapper.find(TaskItem).at(0);
    act(() => {
      item.props().onTaskSelect(TasksMock[0]);
    });
    wrapper.update();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    expect(selectedTaskSection.props().task).toBeDefined();
  });

  it('should mark the task as done', async () => {
    TaskUtils.markAsDone = jest.fn(() => Promise.resolve());
    const wrapper = await mount(renderComponent());
    const item = wrapper.find(TaskItem).at(0);
    act(() => {
      item.props().markAsDone('1');
    });
    expect(TaskUtils.markAsDone).toBeCalled();
  });

  it('should update the task', async () => {
    TaskUtils.markAsDone = jest.fn(() => Promise.resolve());
    const wrapper = await mount(renderComponent());
    const section = wrapper.find(SelectedTaskSection);
    act(() => {
      section
        .props()
        .onTaskUpdate({
          ...TasksMock[0],
          title: 'new title',
          completed: false,
        });
    });
    wrapper.update();
    expect(wrapper.find(TaskItem)).not.toHaveLength(1);
  });

  it('should add the task', () => {
    jest.useFakeTimers();
    TaskUtils.getNewTaskObject = jest.fn(() =>
      Promise.resolve({ ...TasksMock[0] })
    ) as any;
    const wrapper = mount(renderComponent());
    const item = wrapper.find(TaskAddButton);
    act(() => {
      item.props().onTaskAdd('title', null);
    });
    wrapper.update();
    jest.runOnlyPendingTimers();
    expect(TaskUtils.getNewTaskObject).toBeCalled();
  });
});
