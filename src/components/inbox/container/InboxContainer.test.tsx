import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { InboxContainer } from './InboxContainer';
import { SnackbarProvider } from 'notistack';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { act } from '@testing-library/react';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import SlateUtils from '../../../common/utils/slateUtils';
import TestUtils from '../../../common/tests/TestUtils';

require('setimmediate');

describe('InboxContainer', () => {
  beforeEach(() => {
    tasksRequests.fetchTasks = jest.fn(() => Promise.resolve([...TasksMock, { ...TasksMock[0], id: '1', completed: false }]));
    JSON.parse = jest.fn();
    SlateUtils.serialize = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return (
      <SnackbarProvider>
        <InboxContainer useData />
      </SnackbarProvider>
    );
  };

  it('should fetch the tasks on mount', async () => {
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
    expect(tasksRequests.fetchTasks).toBeCalled();
  });

  it('should render content box after fetch', async () => {
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
    expect(wrapper.find(ContentBox)).toHaveLength(1);
  });

  it('should deselect the task properly', async () => {
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
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
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();

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
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();

    const item = wrapper.find(TaskItem).at(0);
    act(() => {
      item.props().markAsDone('1');
    });
    expect(TaskUtils.markAsDone).toBeCalled();
  });

  it('should add the task', async () => {
    TaskUtils.getNewTaskObject = jest.fn(() => Promise.resolve({ ...TasksMock[0] })) as any;

    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
    const item = wrapper.find(TaskAddButton);
    act(() => {
      item.props().onTaskAdd(TestUtils.testData.fakeTitle, null);
    });
    wrapper.update();
    expect(TaskUtils.getNewTaskObject).toBeCalled();
  });

  it('should update the task', async () => {
    TaskUtils.markAsDone = jest.fn(() => Promise.resolve());
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();
    const section = wrapper.find(SelectedTaskSection);
    act(() => {
      section.props().onTaskUpdate({
        ...TasksMock[0],
        title: TestUtils.testData.fakeTitle,
        completed: false,
      });
    });
    wrapper.update();
    expect(wrapper.find(TaskItem)).not.toHaveLength(1);
  });
});
