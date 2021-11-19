import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import TestUtils, {
  MockQueryClient,
  MockReduxProvider,
} from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { TodayContainer } from './TodayContainer';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { mount } from 'enzyme';
import { TaskSkeleton } from '../../common/skeletons/taskSkeleton/TaskSkeleton';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { act } from '@testing-library/react';
import TaskService from '../../../services/TaskService';
import DateUtils from '../../../common/utils/dateUtils';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';

require('setimmediate');

describe('TodayContainer', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    tasksRequests.fetchTasks = jest.fn(() => Promise.resolve([...TasksMock]));
    DateUtils.isTodayDate = jest.fn(() => true);
  });

  const reduxStore = {};

  const renderComponent = () => {
    return (
      <MockQueryClient>
        <MockReduxProvider reduxStore={reduxStore}>
          <SnackbarProvider>
            <TodayContainer useData />
          </SnackbarProvider>
        </MockReduxProvider>
      </MockQueryClient>
    );
  };

  const renderContent = async () => {
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
    return wrapper;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render task skeleton on load', async () => {
    const wrapper = await mount(renderComponent());
    await TestUtils.runAllPromises();

    expect(wrapper.find(TaskSkeleton)).toHaveLength(1);
  });

  it('should render content when all requests are completed', async () => {
    const wrapper = await renderContent();
    expect(wrapper.find(ContentBox)).toHaveLength(1);
  });

  it('should mark the task as done', async () => {
    TaskService.markTaskAsDone = jest.fn();
    const wrapper = await renderContent();
    wrapper.update();
    const taskItem = wrapper.find(TaskItem);

    act(() => {
      taskItem.props().markAsDone(TasksMock[0].id);
    });
    wrapper.update();
    expect(TaskService.markTaskAsDone).toBeCalled();
  });

  it('should set selected a task', async () => {
    const wrapper = await renderContent();
    wrapper.update();
    const taskItem = wrapper.find(TaskItem);

    act(() => {
      taskItem.props().onTaskSelect(TasksMock[0]);
    });
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection).props().task).not.toBeNull();
  });

  it('should handle task update', async () => {
    const wrapper = await renderContent();
    wrapper.update();
    const taskItem = wrapper.find(TaskItem);

    act(() => {
      taskItem.props().onTaskSelect(TasksMock[0]);
    });
    wrapper.update();

    const section = wrapper.find(SelectedTaskSection);

    act(()=> {
      section.props().onTaskUpdate({...TasksMock[0]});
    });
    wrapper.update();
    expect(taskItem.at(0).props().task).toBeDefined();
  });

  it('should add a new task', async () => {
    TaskService.createTask = jest.fn();
    const wrapper = await renderContent();
    wrapper.update();

    const addButton = wrapper.find(TaskAddButton);
    act(() => {
      addButton.props().onTaskAdd('title', null);
    });
    expect(TaskService.createTask).toBeCalled();
  });

  it('should deselect a task', async () => {
    TaskService.markTaskAsDone = jest.fn();
    const wrapper = await renderContent();
    wrapper.update();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);

    act(() => {
      selectedTaskSection.props().deselectTask();
    });
    wrapper.update();
    expect(selectedTaskSection.props().task).toBeNull();
  });
});
