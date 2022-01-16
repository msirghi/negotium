import { mount } from 'enzyme';
import { NotesAddInput } from './NotesAddInput';
import { BorderlessInput } from '../../common/form/input/borderlessInput/BorderlessInput';
import { act } from 'react-test-renderer';
import { NotesAddForm } from './form/NotesAddForm';

describe('NotesAddInput', () => {
  const defaultProps = {
    onNoteAdd: jest.fn(),
  };

  it('should render borderless input by default', () => {
    const wrapper = mount(<NotesAddInput {...defaultProps} />);
    expect(wrapper.find(BorderlessInput)).not.toHaveLength(0);
  });

  it('should render form on borderless input focus', () => {
    const wrapper = mount(<NotesAddInput {...defaultProps} />);
    const input = wrapper.find(BorderlessInput) as any;

    act(() => {
      input.props().onFocus();
    });
    wrapper.update();
    expect(wrapper.find(NotesAddForm)).toHaveLength(1);
  });

  it('should handle note add', () => {
    const wrapper = mount(<NotesAddInput {...defaultProps} />);
    const input = wrapper.find(BorderlessInput) as any;

    act(() => {
      input.props().onFocus();
    });
    wrapper.update();
    const form = wrapper.find(NotesAddForm);
    act(() => {
      form.props().onNoteAdd({ title: 'title', description: 'desc' });
    });
    expect(defaultProps.onNoteAdd).toBeCalled();
  });

  it('should handle transition from form to input', () => {
    const wrapper = mount(<NotesAddInput {...defaultProps} />);
    const input = wrapper.find(BorderlessInput) as any;

    act(() => {
      input.props().onFocus();
    });
    wrapper.update();
    const form = wrapper.find(NotesAddForm);
    act(() => {
      form.props().onClose();
    });
    wrapper.update();
    expect(wrapper.find(BorderlessInput)).toHaveLength(1);
  });
});
