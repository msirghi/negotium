import renderer from 'react-test-renderer';
import { ProjectDialog } from './ProjectDialog';
import { mount } from 'enzyme';
import { Dialog } from '@mui/material';
import { act, fireEvent, render } from '@testing-library/react';

describe('ProjectDialog', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    open: true,
    setOpen: jest.fn(),
    dialogTitle: 'Title',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog', () => {
    const wrapper = mount(<ProjectDialog {...defaultProps} />);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should handle dialog close', () => {
    const wrapper = mount(<ProjectDialog {...defaultProps} />);
    const dialog = wrapper.find(Dialog);
    act(() => {
      // @ts-ignore
      dialog.props().onClose({} as any, 'backdropClick');
    });
    wrapper.update();
    expect(defaultProps.setOpen).toBeCalled();
  });

  it('should render disabled save button by default', () => {
    const { queryAllByTestId } = render(<ProjectDialog {...defaultProps} />);
    expect(queryAllByTestId('save-button')[0]).toBeDisabled();
  });

  it('should handle cancel button click', () => {
    const { queryAllByTestId } = render(<ProjectDialog {...defaultProps} />);
    act(() => {
      fireEvent.click(queryAllByTestId('cancel-button')[0]);
    });
    expect(defaultProps.setOpen).toBeCalled();
  });

  it('should submit the form properly', () => {
    const { queryAllByTestId } = render(<ProjectDialog {...defaultProps} />);
    const nameField = queryAllByTestId('name-field')[0];

    act(() => {
      fireEvent.change(nameField, { target: { value: 'new' } });
    });

    act(() => {
      fireEvent.click(queryAllByTestId('save-button')[0]);
    });
    expect(defaultProps.onSubmit).toBeCalled();
  });
});
