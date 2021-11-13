import { CommonDateProps } from '../types';
import { mount } from 'enzyme';
import { PredefinedOptions } from './PredefinedOptions';
import { ListItem } from '@mui/material';
import { NullableDate } from '../../../../../../../../../common/types/common.types';
import { act } from '@testing-library/react';

describe('PredefinedOptions', () => {
  const defaultProps = {
    onDatePick: jest.fn(),
    selectedDate: null,
  } as unknown as CommonDateProps;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render 2 list items by default', () => {
    const wrapper = mount(<PredefinedOptions {...defaultProps} />);
    expect(wrapper.find(ListItem)).toHaveLength(2);
  });

  it('should render 3 list items is selected date is defined', () => {
    const wrapper = mount(
      <PredefinedOptions
        {...defaultProps}
        selectedDate={new Date() as unknown as NullableDate}
      />
    );
    expect(wrapper.find(ListItem)).toHaveLength(3);
  });

  it('should call prop method on item click', () => {
    const wrapper = mount(<PredefinedOptions {...defaultProps} />);
    const item = wrapper.find(ListItem).at(0);
    act(() => {
      item.simulate('click');
    });
    expect(defaultProps.onDatePick).toBeCalled();
  });

  it('should call prop method on no-date item click', () => {
    const wrapper = mount(
      <PredefinedOptions
        {...defaultProps}
        selectedDate={new Date() as unknown as NullableDate}
      />
    );
    const item = wrapper.find(ListItem).at(2);
    act(() => {
      item.simulate('click');
    });
    expect(defaultProps.onDatePick).toBeCalled();
  });
});
