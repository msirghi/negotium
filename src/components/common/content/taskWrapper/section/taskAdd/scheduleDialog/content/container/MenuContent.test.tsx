import { CommonDateProps } from '../types';
import { mount } from 'enzyme';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';
import { MenuContent } from './MenuContent';
import { ScheduleCalendar } from '../calendar/ScheduleCalendar';
import { act } from '@testing-library/react';

describe('MenuContent', () => {
  const defaultProps = {
    onDatePick: jest.fn(),
    selectedDate: null,
  } as unknown as CommonDateProps;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render calendar on mount', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MenuContent {...defaultProps} />
      </LocalizationProvider>
    );
    expect(wrapper.find(ScheduleCalendar)).toHaveLength(1);
  });

  it('should call prop method on date change', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MenuContent {...defaultProps} />
      </LocalizationProvider>
    );
    const calendar = wrapper.find(ScheduleCalendar);
    act(() => {
      calendar.props().onDatePick(null);
    });
    expect(defaultProps.onDatePick).toBeCalled();
  });
});
