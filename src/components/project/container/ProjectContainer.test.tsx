import { projectsMock } from '../../../common/tests/mockData/projects-mock';
import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import TestUtils, {
  MockQueryClient,
  MockReduxProvider,
} from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { ProjectContainer } from './ProjectContainer';
import { mount } from 'enzyme';
import { act, render, waitFor } from '@testing-library/react';
import { ProjectDialogWrapper } from '../dialog/ProjectDialogWrapper';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';

require('setimmediate');

jest.useRealTimers();

const mockProjects = [...projectsMock];
const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {
      id: mockProjects[0].id,
    },
    push: mockPush,
  }),
}));

describe('ProjectContainer', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    tasksRequests.fetchTasksByProject = jest.fn(() =>
      Promise.resolve([...TasksMock])
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const reduxStore = {
    projects: {
      projects: [...projectsMock],
    },
  };

  const renderComponent = () => {
    return (
      <MockQueryClient>
        <MockReduxProvider reduxStore={reduxStore}>
          <SnackbarProvider>
            <ProjectContainer />
          </SnackbarProvider>
        </MockReduxProvider>
      </MockQueryClient>
    );
  };

  const getRenderedList = async () => {
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();

    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => {
      selectedTaskSection.props().deselectTask();
    });
    wrapper.update();
    return wrapper;
  };

  it('should toggle project dialog', async () => {
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();

    const taskWrapper = wrapper.find(TaskWrapper);
    act(() => {
      taskWrapper.props().projectOptions!.onClick();
    });
    wrapper.update();
    expect(wrapper.find(ProjectDialogWrapper).props().open).toBeFalsy();
  });

  it('should handle task add', async () => {
    TaskService.createTask = jest.fn();
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();

    const taskButton = wrapper.find(TaskAddButton);
    act(() => {
      taskButton.props().onTaskAdd('title', null);
    });
    expect(TaskService.createTask).toBeCalled();
  });

  it('should handle task deselect', async () => {
    TaskService.createTask = jest.fn();
    const wrapper = await getRenderedList();

    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => {
      selectedTaskSection.props().deselectTask();
    });
    wrapper.update();
    expect(selectedTaskSection.props().task).toBeNull();
  });

  it('should mark the task as done', async () => {
    TaskService.createTask = jest.fn();
    TaskUtils.markAsDone = jest.fn();
    const wrapper = await getRenderedList();

    const taskItem = wrapper.find(TaskItem);
    act(() => {
      taskItem.props().markAsDone(TasksMock[1].id);
    });
    expect(TaskUtils.markAsDone).toBeCalled();
  });

  it('should update the task', async () => {
    const wrapper = await getRenderedList();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => {
      selectedTaskSection.props().onTaskUpdate(TasksMock[0]);
    });
    expect(wrapper.find(TaskItem)).toHaveLength(1);
  });

  it('should set the selected task', async () => {
    TaskUtils.markAsDone = jest.fn();
    const wrapper = await getRenderedList();
    const taskItem = wrapper.find(TaskItem);
    act(() => {
      taskItem.props().onTaskSelect(TasksMock[1]);
    });
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection)).toBeDefined();
  });

  it('should render loader on initial render', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should render content', async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(renderComponent());

    await waitFor(() => {
      expect(getByTestId('content')).toBeInTheDocument();
    });
  });
});
