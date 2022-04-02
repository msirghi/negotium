import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { noirAppTheme } from '../../../common/theme/appTheme';
import { TimelineSection } from './TimelineSection';
import { TimelineItem } from '../item/TimelineItem';
import { ThemeProvider } from '@mui/system';
import { act } from '@testing-library/react';

describe('TimelineSection', () => {
  const defaultProps = {
    group: { date: new Date().toString(), tasks: TasksMock },
    selectTask: jest.fn(),
    selectedTask: TasksMock[0],
    markAsDone: jest.fn(),
  };

  const renderComponent = (props: object = {}) => {
    return (
      <ThemeProvider theme={noirAppTheme}>
        <TimelineSection {...defaultProps} {...props} />
      </ThemeProvider>
    );
  };

  it('should render timeline items', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(TimelineItem)).not.toHaveLength(0);
  });

  it('should not render timeline items if there are no tasks', () => {
    const wrapper = mount(renderComponent({ group: { tasks: [] } }));
    expect(wrapper.find(TimelineItem)).toHaveLength(0);
  });

  it('should handle click on timeline item', () => {
    const wrapper = mount(renderComponent());
    const item = wrapper.find(TimelineItem).at(0);
    act(() => item.props().onClick(TasksMock[0]));
    expect(defaultProps.selectTask).toBeCalled();
  });
});
