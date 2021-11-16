import renderer from 'react-test-renderer';
import { EditForm } from './EditForm';
import { act, fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';

describe('EditForm', () => {
  const defaultProps = {
    fieldValue: 'val',
    setFieldValue: jest.fn(),
    onDateSelect: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<EditForm {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should call prop method on input change', () => {
    const { getByTestId } = render(<EditForm {...defaultProps} />);
    const input = getByTestId('tab-title-field');

    act(() => {
      fireEvent.change(input, { target: { value: 'new' } });
    });
    expect(defaultProps.setFieldValue).toBeCalled();
  });

  it('should call prop method on date select', () => {
    const wrapper = mount(<EditForm {...defaultProps} />);
    const dialog = wrapper.find(ScheduleDialog);
    act(() => {
      dialog.props().onDateSelect(null);
    });
    expect(defaultProps.onDateSelect).toBeCalled();
  });
});
