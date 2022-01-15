import { act } from 'react-test-renderer';
import { NotesAddForm } from './NotesAddForm';
import { mount } from 'enzyme';
import { Button } from '@mui/material';
import { BorderlessInput } from '../../../common/form/input/borderlessInput/BorderlessInput';

describe('NotesAddForm', () => {
  const defaultProps = {
    onClose: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render content', () => {
    const wrapper = mount(<NotesAddForm {...defaultProps} />);
    expect(wrapper.find(BorderlessInput)).toHaveLength(1);
  });

  it('should handle onClose event', () => {
    const wrapper = mount(<NotesAddForm {...defaultProps} />);
    const closeButton = wrapper.find(Button);

    act(() => {
      closeButton.simulate('click');
    });

    expect(defaultProps.onClose).toBeCalled();
  });
});
