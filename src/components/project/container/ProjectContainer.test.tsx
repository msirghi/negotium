import { projectsMock, sectionsMock } from '../../../common/tests/mockData/projects-mock';
import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import TestUtils, { MockReduxProvider } from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { ProjectContainer } from './ProjectContainer';
import { mount } from 'enzyme';
import { act, render, waitFor } from '@testing-library/react';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import FeatureToggles from '../../../utilities/featureToggles/FeatureToggles';
import ProjectService from '../../../services/ProjectService';
import { SectionWrapper } from '../../common/content/taskWrapper/section/wrapper/SectionWrapper';
import { AddSectionRow } from '../../common/content/taskWrapper/section/add/AddSectionRow';

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
    FeatureToggles.isFeatureEnabled = jest.fn(() => false);
    tasksRequests.fetchTasksByProject = jest.fn(() => Promise.resolve([...TasksMock]));
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
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <ProjectContainer projectId={mockProjects[0].id} />
        </SnackbarProvider>
      </MockReduxProvider>
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

  it('should handle section remove', async () => {
    jest.spyOn(ProjectService, 'getProjectSections').mockImplementation(() => Promise.resolve(sectionsMock));
    jest.spyOn(ProjectService, 'deleteProjectSection').mockImplementation();

    const wrapper = await getRenderedList();
    const section = wrapper.find(SectionWrapper).at(0);
    act(() => {
      section.props().onSectionRemove('id');
    });
    expect(ProjectService.deleteProjectSection).toBeCalled();
  });

  it('should handle new section create', async () => {
    jest.spyOn(ProjectService, 'getProjectSections').mockImplementation(() => Promise.resolve(sectionsMock));
    jest.spyOn(ProjectService, 'addProjectSection').mockImplementation();
    const wrapper = await getRenderedList();
    const sectionAdd = wrapper.find(AddSectionRow);

    act(() => {
      sectionAdd.props().onSectionSave('title', 1);
    });
    expect(ProjectService.addProjectSection).toBeCalled();
  });

  it('should handle section update', async () => {
    jest.spyOn(ProjectService, 'getProjectSections').mockImplementation(() => Promise.resolve(sectionsMock));
    jest.spyOn(ProjectService, 'updateProjectSectionTitle').mockImplementation();
    const wrapper = await getRenderedList();
    const section = wrapper.find(SectionWrapper).at(0);

    act(() => {
      section.props().onSectionUpdate('new title', 'id');
    });
    expect(ProjectService.updateProjectSectionTitle).toBeCalled();
  });

  it('should set the selected task', async () => {
    jest.spyOn(ProjectService, 'addProjectTask').mockImplementation();
    jest.spyOn(ProjectService, 'updateProjectTask').mockImplementation();
    const wrapper = await getRenderedList();

    const taskItem = wrapper.find(TaskItem);
    act(() => {
      taskItem.props().onTaskSelect(TasksMock[1]);
    });
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection)).toBeDefined();
  });

  it('should handle task add', async () => {
    jest.spyOn(ProjectService, 'addProjectTask').mockImplementation();
    const wrapper = await mount(renderComponent());
    wrapper.update();
    await TestUtils.runAllPromises();
    wrapper.update();

    const taskButton = wrapper.find(TaskAddButton).at(0);
    act(() => {
      taskButton.props().onTaskAdd('title', null);
    });
    expect(ProjectService.addProjectTask).toBeCalled();
  });

  it('should handle task deselect', async () => {
    jest.spyOn(ProjectService, 'addProjectTask').mockImplementation();
    const wrapper = await getRenderedList();

    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => {
      selectedTaskSection.props().deselectTask();
    });
    wrapper.update();
    expect(selectedTaskSection.props().task).toBeNull();
  });

  it('should mark the task as done', async () => {
    jest.spyOn(ProjectService, 'addProjectTask').mockImplementation();
    jest.spyOn(ProjectService, 'updateProjectTask').mockImplementation();
    const wrapper = await getRenderedList();

    const taskItem = wrapper.find(TaskItem);
    act(() => {
      taskItem.props().markAsDone(TasksMock[1].id);
    });
    expect(ProjectService.updateProjectTask).toBeCalled();
  });

  it('should update the task', async () => {
    jest.spyOn(ProjectService, 'updateProjectTask').mockImplementation();
    const wrapper = await getRenderedList();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => {
      selectedTaskSection.props().onTaskUpdate({ ...TasksMock[0], completed: false });
    });
    expect(wrapper.find(SelectedTaskSection)).toHaveLength(1);
  });

  it('should render loader on initial render', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find('div')).not.toHaveLength(0);
  });

  it('should render content', async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(renderComponent());

    await waitFor(() => {
      expect(getByTestId('content')).toBeInTheDocument();
    });
  });
});
