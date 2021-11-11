import { act, fireEvent, render } from '@testing-library/react';
import { TaskAddButton } from './TaskAddButton';

describe('TaskAddButton', () => {
  const defaultProps = {
    onTaskAdd: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render button on initial render', () => {
    const { getByTestId } = render(<TaskAddButton {...defaultProps} />);
    expect(getByTestId('tab-add-button')).toBeInTheDocument();
  });

  it('should render input field on add button click', () => {
    const { getByTestId } = render(<TaskAddButton {...defaultProps} />);

    const addButton = getByTestId('tab-add-button');
    act(() => {
      fireEvent.click(addButton);
    });
    expect(getByTestId('tab-title-field')).toBeInTheDocument();
  });

  it('should call prop method on save', () => {
    const { getByTestId } = render(<TaskAddButton {...defaultProps} />);

    const addButton = getByTestId('tab-add-button');
    act(() => {
      fireEvent.click(addButton);
    });

    const field = getByTestId('tab-title-field');
    act(() => {
      fireEvent.change(field, { target: { value: 'Value' } });
    });

    const submitButton = getByTestId('tab-submit-button');
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(defaultProps.onTaskAdd).toBeCalled();
  });

  it('should hide input field on cancel button click', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskAddButton {...defaultProps} />
    );

    const addButton = getByTestId('tab-add-button');
    act(() => {
      fireEvent.click(addButton);
    });

    const field = getByTestId('tab-title-field');
    expect(field).toBeInTheDocument();
    const cancelButton = getByTestId('tab-cancel-button');
    act(() => {
      fireEvent.click(cancelButton);
    });
    expect(queryByTestId('tab-title-field')).not.toBeInTheDocument();
  });
});
