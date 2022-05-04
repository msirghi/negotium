import { mount } from 'enzyme';
import TimelineContainer from './TimelineContainer';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { ThemeProvider } from '@mui/system';
import { noirAppTheme } from '../../../common/theme/appTheme';
import { TimelineSection } from '../section/TimelineSection';
import { act } from '@testing-library/react';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import TaskService from '../../../services/TaskService';
import { TimelineOptions } from '../options/TimelineOptions';
import { ListCalendar } from '../../calendar/list/ListCalendar';
import StorageUtils from "../../../common/utils/storageUtils";
import {TimelineView} from "../../../common/constants/enums";
import {SnackbarProvider} from "notistack";

describe('TimelineContainer', () => {
  const reduxStore = {
    tasks: {
      tasks: TasksMock,
    },
  };

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <ThemeProvider theme={noirAppTheme}>
            <TimelineContainer />
          </ThemeProvider>
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  afterEach(jest.clearAllMocks);

  it('should render SelectedTaskSection with unselected task by default', () => {
    const wrapper = mount(renderComponent());
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    expect(selectedTaskSection.props().task).toBeNull();
  });

  it('should select the task and render SelectedTaskSection with defined task', () => {
    const wrapper = mount(renderComponent());
    const section = wrapper.find(TimelineSection).at(0);

    act(() => {
      section.props().selectTask(TasksMock[0]);
    });
    wrapper.update();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    expect(selectedTaskSection.props().task).toBeDefined();
  });

  it('should handle task deselect', () => {
    const wrapper = mount(renderComponent());
    const section = wrapper.find(TimelineSection).at(0);

    act(() => section.props().selectTask(TasksMock[0]));
    wrapper.update();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => selectedTaskSection.props().deselectTask());
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection).props().task).toBeNull();
  });

  it('should select the task and handle update', () => {
    const newTitle = 'New title';
    const wrapper = mount(renderComponent());
    const section = wrapper.find(TimelineSection).at(0);

    act(() => section.props().selectTask(TasksMock[0]));
    wrapper.update();
    const selectedTaskSection = wrapper.find(SelectedTaskSection);
    act(() => selectedTaskSection.props().onTaskUpdate({ ...TasksMock[0], title: newTitle }));
    wrapper.update();
    expect(selectedTaskSection.props().task).toBeDefined();
  });

  it('should mark the task as done', () => {
    jest.spyOn(TaskUtils, 'markAsDone').mockImplementation();
    const wrapper = mount(renderComponent());
    const section = wrapper.find(TimelineSection).at(0);

    act(() => section.props().markAsDone(TasksMock[0].id));
    expect(TaskUtils.markAsDone).toBeCalled();
  });

  it('should handle task add', () => {
    jest.spyOn(TaskService, 'createTask').mockImplementation();
    const wrapper = mount(renderComponent());
    const options = wrapper.find(TimelineOptions);
    act(() => options.props().onTaskAdd('title', null));
    expect(TaskService.createTask).toBeCalled();
  });

  it('should handle view switch', () => {
    const wrapper = mount(renderComponent());
    const options = wrapper.find(TimelineOptions);
    act(() => options.props().onViewSwitch());
    wrapper.update();
    expect(wrapper.find(ListCalendar)).toHaveLength(1);
  });

  it('should handle view switch if current view is LIST', () => {
    StorageUtils.localStorage.getTimelineDefaultView = jest.fn(() => TimelineView.LIST);
    const wrapper = mount(renderComponent());
    const options = wrapper.find(TimelineOptions);
    act(() => options.props().onViewSwitch());
    wrapper.update();
    expect(wrapper.find(ListCalendar)).not.toHaveLength(1);
  });

  it('should render calendar based on local cache', () => {
    StorageUtils.localStorage.getTimelineDefaultView = jest.fn(() => TimelineView.LIST);
    const wrapper = mount(renderComponent());
    expect(wrapper.find(ListCalendar)).toHaveLength(1);
  });

  it('should render timeline options based on local cache', () => {
    StorageUtils.localStorage.getTimelineDefaultView = jest.fn(() => TimelineView.DEFAULT);
    const wrapper = mount(renderComponent());
    expect(wrapper.find(TimelineOptions)).toHaveLength(1);
  });

  it('should handle task selection from list view', () => {
    StorageUtils.localStorage.getTimelineDefaultView = jest.fn(() => TimelineView.LIST);
    const wrapper = mount(renderComponent());
    const calendar = wrapper.find(ListCalendar);
    act(() => {
      calendar.props().onTaskClick(TasksMock[0].id);
    })
    wrapper.update();
    expect(wrapper.find(SelectedTaskSection).props().task).toBeDefined();
  });
});
