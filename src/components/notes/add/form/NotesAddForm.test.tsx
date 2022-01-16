import { act } from 'react-test-renderer';
import { NotesAddForm } from './NotesAddForm';
import { mount } from 'enzyme';
import { Button } from '@mui/material';
import { BorderlessInput } from '../../../common/form/input/borderlessInput/BorderlessInput';

describe('NotesAddForm', () => {
  const defaultProps = {
    onClose: jest.fn(),
    onNoteAdd: jest.fn()
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

  it('should handle form submission', () => {
    const wrapper = mount(<NotesAddForm {...defaultProps} />);
    const form = wrapper.find('form') as any;

    act(() => {
      form.props().onSubmit({ preventDefault: jest.fn() });
    });

    expect(defaultProps.onNoteAdd).toBeCalled();
  });
});
