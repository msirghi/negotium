import { ScheduleCalendar } from './ScheduleCalendar';
import { CommonDateProps } from '../types';
import { mount } from 'enzyme';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';
import { act } from '@testing-library/react';

describe('ScheduleCalendar', () => {
  const defaultProps = {
    onDatePick: jest.fn(),
    selectedDate: null,
  } as unknown as CommonDateProps;

  it('should render calendar', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ScheduleCalendar {...defaultProps} />
      </LocalizationProvider>
    );
    const calendar = wrapper.find(StaticDatePicker);
    expect(calendar).toHaveLength(1);
  });

  it('should fire prop method on date change', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ScheduleCalendar {...defaultProps} />
      </LocalizationProvider>
    );
    const calendar = wrapper.find(StaticDatePicker);
    calendar.props().renderInput();

    act(() => {
      calendar.props().onChange(new Date());
    });
    expect(defaultProps.onDatePick).toBeCalled();
  });
});
