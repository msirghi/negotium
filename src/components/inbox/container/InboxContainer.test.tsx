import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { InboxContainer } from './InboxContainer';
import { SnackbarProvider } from 'notistack';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { act } from '@testing-library/react';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TestUtils, { MockReduxProvider } from '../../../common/tests/TestUtils';
import TaskService from "../../../services/TaskService";

require('setimmediate');

describe('InboxContainer', () => {
  beforeEach(() => {
    jest.spyOn(TaskService, 'createTask').mockImplementation();
    jest.spyOn(TaskService, 'markTaskAsDone').mockImplementation();
    jest.spyOn(TaskService, 'updateTaskName').mockImplementation()
    jest.spyOn(TaskService, 'updateTaskDueDate').mockImplementation()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = async () => {
    const reduxStore = { tasks: { tasks: TasksMock }, account: {} };
    const wrapper = mount(
      <SnackbarProvider>
        <MockReduxProvider reduxStore={reduxStore}>
          <InboxContainer />
        </MockReduxProvider>
      </SnackbarProvider>
    );
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
    return wrapper;
  };

  const renderAndSelectTask = async () => {
    const wrapper = await renderComponent();
    const taskItem = wrapper.find(TaskItem).at(0);

    act(() => {
      taskItem.props().onTaskSelect(TasksMock[0]);
    });
    wrapper.update();
    return wrapper;
  }

  it('should render tasks on mount', async () => {
    const wrapper = await renderComponent();
    expect(wrapper.find(TaskItem)).not.toHaveLength(0);
  });

  it('should handle task deselect', async () => {
    const wrapper = await renderAndSelectTask()
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    expect(selectedTaskSection.props().task).toBeDefined();

    act(() => {
      selectedTaskSection.props().deselectTask();
    });
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection).props().task).toBeNull();
  });

  it('should select the task properly', async () => {
    const wrapper = await renderAndSelectTask();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    expect(selectedTaskSection.props().task).toBeDefined();
  });

  it('should mark the task as done', async () => {
    TaskUtils.markAsDone = jest.fn(() => Promise.resolve());
    const wrapper = await renderComponent();

    const item = wrapper.find(TaskItem).at(0);
    act(() => {
      item.props().markAsDone('1');
    });
    expect(TaskUtils.markAsDone).toBeCalled();
  });

  it('should add the task', async () => {
    TaskUtils.getNewTaskObject = jest.fn(() => Promise.resolve({ ...TasksMock[0] })) as any;

    const wrapper = await renderComponent();
    const item = wrapper.find(TaskAddButton);
    act(() => {
      item.props().onTaskAdd(TestUtils.testData.fakeTitle, null);
    });
    wrapper.update();
    expect(TaskUtils.getNewTaskObject).toBeCalled();
  });

  it('should handle task update', async () => {
    const wrapper = await renderAndSelectTask();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    const updateTitle = 'title';

    act(() => {
      selectedTaskSection.props().onTaskUpdate({...TasksMock[0], title: updateTitle });
    });
    wrapper.update();
    expect(selectedTaskSection.props().task!.title).toBeDefined();
  });
});
