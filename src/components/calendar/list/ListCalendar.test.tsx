import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import FullCalendar from '@fullcalendar/react';
import { mount } from 'enzyme';
import { ListCalendar } from './ListCalendar';
import CalendarUtils from '../../../common/utils/calendarUtils';
import { act } from '@testing-library/react';

describe('ListCalendar', () => {
  const defaultProps = {
    tasks: TasksMock,
    onTaskClick: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(CalendarUtils, 'updateCalendarStyles').mockImplementation();
  });

  it('should render Calendar', () => {
    const wrapper = mount(<ListCalendar {...defaultProps} />);
    expect(wrapper.find(FullCalendar)).toHaveLength(1);
  });

  it('should update calendar styles on mount', () => {
    jest.useFakeTimers();
    mount(<ListCalendar {...defaultProps} tasks={[]} />);
    jest.runAllTimers();
    expect(CalendarUtils.updateCalendarStyles).toBeCalled();
  });

  it('should handle event click', () => {
    const wrapper = mount(<ListCalendar {...defaultProps} />);
    const calendar = wrapper.find(FullCalendar) as any;
    act(() => {
      calendar.props().eventClick({ event: { id: 'id' } });
    });
    expect(defaultProps.onTaskClick).toBeCalled();
  });
});
