import { DialogOptions } from './types';
import renderer from 'react-test-renderer';
import { StandardDialog } from './StandardDialog';
import { mount } from 'enzyme';
import { Dialog } from '@mui/material';
import { act, fireEvent, render } from '@testing-library/react';

describe('StandardDialog', () => {
  const defaultProps = {
    open: false,
    setOpen: jest.fn(),
    options: {
      submitButtonLabel: 'Submit',
      cancelButtonLabel: 'Cancel',
      dialogTitle: 'Title',
    } as DialogOptions,
    onSubmit: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<StandardDialog {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should call prop method on dialog close', () => {
    const wrapper = mount(<StandardDialog {...defaultProps} />);
    const dialog = wrapper.find(Dialog) as any;
    act(() => {
      dialog.props().onClose({}, 'escapeKeyDown');
    });
    expect(defaultProps.setOpen).toBeCalled();
  });

  it('should render info icon if info message is provided', () => {
    const updOptions = { ...defaultProps.options };
    updOptions.infoMessage = 'message';

    const { getByTestId } = render(
      <StandardDialog {...defaultProps} options={updOptions} open />
    );
    expect(getByTestId('info-icon')).toBeInTheDocument();
  });

  it('should call onSubmit prop method on save button click', () => {
    const { getByTestId } = render(<StandardDialog {...defaultProps} open />);
    const button = getByTestId('save-button');
    act(() => {
      fireEvent.click(button);
    });
    expect(defaultProps.onSubmit).toBeCalled();
  });
});
