import { NotesMock } from '../../../../common/tests/mockData/notes-mock';
import { act } from 'react-test-renderer';
import { NoteDialog } from './NoteDialog';
import { mount } from 'enzyme';
import { Button, Dialog } from '@mui/material';
import { BorderlessInput } from '../../../common/form/input/borderlessInput/BorderlessInput';
import RichTextField from '../../../common/form/input/richText/RichTextField';

jest.useFakeTimers();

describe('NoteDialog', () => {
  const defaultProps = {
    open: true,
    note: NotesMock[0],
    closeDialog: jest.fn(),
    onNoteUpdate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog', () => {
    const wrapper = mount(<NoteDialog {...defaultProps} />);
    const dialog = wrapper.find(Dialog) as any;
    expect(dialog).toHaveLength(1);
  });

  it('should handle onClose dialog event', () => {
    const wrapper = mount(<NoteDialog {...defaultProps} />);
    const dialog = wrapper.find(Dialog) as any;

    act(() => {
      dialog!.props().onClose();
    });
    expect(defaultProps.closeDialog).toBeCalled();
  });

  it('should handle save dialog button click', () => {
    const wrapper = mount(<NoteDialog {...defaultProps} />);
    const button = wrapper.find(Button);

    act(() => {
      button.simulate('click');
    });
    expect(defaultProps.closeDialog).toBeCalled();
  });

  it('should handle title update', () => {
    const wrapper = mount(<NoteDialog {...defaultProps} />);
    const input = wrapper.find(BorderlessInput) as any;

    act(() => {
      input.props().onChange({ target: { value: 'value' } });
    });
    jest.runOnlyPendingTimers();
    expect(defaultProps.onNoteUpdate).toBeCalled();
  });

  it('should description update', () => {
    const wrapper = mount(<NoteDialog {...defaultProps} />);
    const input = wrapper.find(RichTextField) as any;

    act(() => {
      input.props().setValue([]);
    });
    jest.runOnlyPendingTimers();
    expect(defaultProps.onNoteUpdate).toBeCalled();
  });
});
