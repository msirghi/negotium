import renderer from 'react-test-renderer';
import { AddSectionRow } from './AddSectionRow';
import { act, fireEvent, render } from '@testing-library/react';

describe('AddSectionRow', () => {
  const defaultProps = {
    onSectionSave: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<AddSectionRow {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render title by default', () => {
    const { getByTestId } = render(<AddSectionRow {...defaultProps} />);
    expect(getByTestId('title')).toBeInTheDocument();
  });

  it('should show input on title click', () => {
    const { getByTestId } = render(<AddSectionRow {...defaultProps} />);
    const title = getByTestId('title');

    act(() => {
      fireEvent.click(title);
    });

    expect(getByTestId('section-name-field')).toBeInTheDocument();
  });

  it('should update the title', () => {
    const { getByTestId } = render(<AddSectionRow {...defaultProps} />);
    const title = getByTestId('title');

    act(() => {
      fireEvent.click(title);
    });

    const titleField = getByTestId('section-name-field');
    act(() => {
      fireEvent.change(titleField, { target: { value: 'new value' } });
    });

    const saveButton = getByTestId('save-button');
    act(() => {
      fireEvent.click(saveButton);
    });
    expect(defaultProps.onSectionSave).toBeCalled();
  });

  it('should cancel the edit mode', () => {
    const { getByTestId, queryByTestId } = render(
      <AddSectionRow {...defaultProps} />
    );
    const title = getByTestId('title');

    act(() => {
      fireEvent.click(title);
    });

    const cancelButton = getByTestId('cancel-button');
    act(() => {
      fireEvent.click(cancelButton);
    });
    expect(queryByTestId('section-name-field')).not.toBeInTheDocument();
  });
});
