import renderer from 'react-test-renderer';
import { EditableTitle } from './EditableTitle';
import { mount } from 'enzyme';
import { TextField, Typography } from '@mui/material';
import { act, fireEvent, render } from '@testing-library/react';

describe('EditableTitle', () => {
  const defaultProps = {
    title: 'Some title',
    editableOptions: {
      title: '',
      onSave: jest.fn(),
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<EditableTitle {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match the snapshot with provided font size', () => {
    const tree = renderer.create(
      <EditableTitle
        {...defaultProps}
        editableOptions={{
          ...defaultProps.editableOptions,
          inputFontSize: 14,
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('should show input field on title click', () => {
    const wrapper = mount(<EditableTitle {...defaultProps} />);
    const title = wrapper.find(Typography);

    title.simulate('click');
    wrapper.update();
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('should show an error on submitting an empty value', () => {
    const { getByTestId, getByText } = render(
      <EditableTitle {...defaultProps} />
    );
    const title = getByTestId('et-title');
    act(() => {
      fireEvent.click(title);
    });

    const input = getByTestId('et-title-field');
    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    const submitButton = getByTestId('et-save-button');
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(getByText('Field is mandatory.')).toBeInTheDocument();
  });

  it('should call new method on saving the value', () => {
    const { getByTestId } = render(<EditableTitle {...defaultProps} />);
    const title = getByTestId('et-title');
    act(() => {
      fireEvent.click(title);
    });

    const input = getByTestId('et-title-field');
    act(() => {
      fireEvent.change(input, { target: { value: 'Value' } });
    });

    const submitButton = getByTestId('et-save-button');
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(defaultProps.editableOptions.onSave).toBeCalledWith('Value');
  });

  it('should hide an input if cancel button was clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <EditableTitle {...defaultProps} />
    );
    const title = getByTestId('et-title');
    act(() => {
      fireEvent.click(title);
    });

    const input = getByTestId('et-title-field');
    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    const cancelButton = getByTestId('et-cancel-button');
    act(() => {
      fireEvent.click(cancelButton);
    });
    expect(queryByTestId('et-title-field')).not.toBeInTheDocument();
  });
});
