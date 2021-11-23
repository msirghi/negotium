import { act, fireEvent, render } from '@testing-library/react';
import { TaskAddButton } from './TaskAddButton';
import { mount } from 'enzyme';
import { EditForm } from './editForm/EditForm';

describe('TaskAddButton', () => {
  const defaultProps = {
    onTaskAdd: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderAndSelectDate = () => {
    const wrapper = mount(<TaskAddButton {...defaultProps} />);
    const addButton = wrapper.find('#tab-add-button').at(0);
    act(() => {
      addButton.simulate('click');
    });
    wrapper.update();

    const editForm = wrapper.find(EditForm).at(0);
    act(() => {
      editForm.props().onDateSelect(null);
    });
    return wrapper;
  }


  it('should render button on initial render', () => {
    const { getByTestId } = render(<TaskAddButton {...defaultProps} />);
    expect(getByTestId('tab-add-button')).toBeInTheDocument();
  });

  it('should render input field on add button click', () => {
    // const wrapper = mount(<TaskAddButton {...defaultProps}/>);
    const { getByTestId } = render(<TaskAddButton {...defaultProps} />);

    const addButton = getByTestId('tab-add-button');
    act(() => {
      fireEvent.click(addButton);
    });
    expect(getByTestId('tab-title-field')).toBeInTheDocument();
  });

  it('should call prop method on save', () => {
    const wrapper = renderAndSelectDate();
    const submitButton = wrapper.find('#tab-submit-button').at(0);
    act(() => {
      submitButton.simulate('click');
    });
    wrapper.update();
    expect(defaultProps.onTaskAdd).toBeCalled();
  });

  it('should hide input field on cancel button click', () => {
    const wrapper = renderAndSelectDate();
    const button = wrapper.find('#tab-cancel-button').at(0);
    act(() => {
      button.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('#tab-title-field')).toHaveLength(0);
  });
});
