import { mount } from 'enzyme';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';
import { ScheduleDialog } from './ScheduleDialog';
import { MenuContent } from './content';
import { act } from '@testing-library/react';
import { NullableDate } from '../../../../../../../common/types/common.types';
import { Menu } from '@mui/material';

describe('ScheduleDialog', () => {
  const defaultProps = {
    onDateSelect: jest.fn(),
  };

  it('should render menu content', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ScheduleDialog {...defaultProps} />
      </LocalizationProvider>
    );
    const button = wrapper.find('#schedule-button');
    act(() => {
      button.simulate('click');
    });
    wrapper.update();
    const content = wrapper.find(MenuContent);
    expect(content).toHaveLength(1);
  });

  it('should select the date and save it', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ScheduleDialog {...defaultProps} />
      </LocalizationProvider>
    );
    const button = wrapper.find('#schedule-button');
    act(() => {
      button.simulate('click');
    });
    wrapper.update();

    const content = wrapper.find(MenuContent);
    act(() => {
      content.props().onDatePick(new Date() as unknown as NullableDate);
    });

    wrapper.update();
    expect(content.props().selectedDate).toBeDefined();
  });

  it('should handle menu close action', () => {
    const wrapper = mount(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ScheduleDialog {...defaultProps} />
      </LocalizationProvider>
    );
    const button = wrapper.find('#schedule-button');
    act(() => {
      button.simulate('click');
    });
    wrapper.update();

    const menu = wrapper.find(Menu)!;
    act(() => {
      menu.props().onClose!({} as Object, 'escapeKeyDown');
    });

    wrapper.update();
    expect(wrapper.find(MenuContent)).not.toHaveLength(2);
  });
});
