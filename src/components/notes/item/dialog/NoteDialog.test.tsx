import { NotesMock } from '../../../../common/tests/mockData/notes-mock';
import renderer, { act } from 'react-test-renderer';
import { NoteDialog } from './NoteDialog';
import { mount } from 'enzyme';
import { Button, Dialog } from '@mui/material';

describe('NoteDialog', () => {
  const defaultProps = {
    open: true,
    note: NotesMock[0],
    closeDialog: jest.fn(),
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
});
