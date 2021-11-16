import { mount } from 'enzyme';
import { SelectedTaskSection } from './SelectedTaskSection';
import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import { TaskSectionContent } from '../content/TaskSectionContent';
import TestUtils from '../../../../../common/tests/TestUtils';
import { SwipeableDrawer } from '@mui/material';
import { act } from '@testing-library/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TaskSectionHeader } from '../header/TaskSectionHeader';
import { NotSelectedSection } from '../notSelected/NotSelectedSection';

describe('SelectedTaskSection', () => {
  const defaultProps = {
    task: TasksMock[0],
    onTaskUpdate: jest.fn(),
    deselectTask: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render content if all props are provided', () => {
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    expect(wrapper.find(TaskSectionContent)).toHaveLength(1);
  });

  it('should render not selected component if nothing is selected', () => {
    const wrapper = mount(
      <SelectedTaskSection {...defaultProps} task={null} />
    );
    expect(wrapper.find(NotSelectedSection)).toHaveLength(1);
  });

  it('should not render not selected component if nothing is selected on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(
      <SelectedTaskSection {...defaultProps} task={null} />
    );
    expect(wrapper.find(NotSelectedSection)).toHaveLength(0);
  });

  it('should render drawer on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    expect(wrapper.find(SwipeableDrawer)).toHaveLength(1);
  });

  it('should handle drawer close', () => {
    jest.useFakeTimers();
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    const drawer = wrapper.find(SwipeableDrawer);
    act(() => {
      drawer.props().onClose();
    });
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(defaultProps.deselectTask).toBeCalled();
  });

  it('should handle drawer open', () => {
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    const drawer = wrapper.find(SwipeableDrawer);
    act(() => {
      drawer.props().onOpen();
    });
    wrapper.update();
    expect(drawer.props().open).toBeTruthy();
  });

  it('should handle drawer close on mobile on back button click', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    const drawer = wrapper.find(SwipeableDrawer);
    act(() => {
      drawer.props().onOpen();
    });

    const backButton = wrapper.find(ArrowBackIcon);
    backButton.simulate('click');
    wrapper.update();
    expect(drawer.props().isOpen).toBeFalsy();
  });

  it('should handle date update [null]', () => {
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    const header = wrapper.find(TaskSectionHeader);
    act(() => {
      header.props().onTaskDateUpdate(null);
    });
    expect(defaultProps.onTaskUpdate).toBeCalled();
  });

  it('should handle date update', () => {
    const wrapper = mount(<SelectedTaskSection {...defaultProps} />);
    const header = wrapper.find(TaskSectionHeader);
    act(() => {
      header.props().onTaskDateUpdate(new Date());
    });
    expect(defaultProps.onTaskUpdate).toBeCalled();
  });
});
