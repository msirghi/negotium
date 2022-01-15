import { NotesMock } from '../../../common/tests/mockData/notes-mock';
import renderer, { act } from 'react-test-renderer';
import { NoteItem } from './NoteItem';
import { mount } from 'enzyme';
import { Card } from '@mui/material';
import { NoteDialog } from './dialog/NoteDialog';

describe('NoteItem', () => {
  const defaultProps = {
    note: NotesMock[0],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<NoteItem {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should handle dialog open', () => {
    const wrapper = mount(<NoteItem {...defaultProps} />);
    const card = wrapper.find(Card);

    act(() => {
      card.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(NoteDialog).props().open).toBeTruthy();
  });

  it('should handle dialog close', () => {
    const wrapper = mount(<NoteItem {...defaultProps} />);
    const card = wrapper.find(Card);

    act(() => {
      card.simulate('click');
    });
    wrapper.update();
    const noteDialog = wrapper.find(NoteDialog);
    expect(noteDialog.props().open).toBeTruthy();

    act(() => {
      noteDialog.props().closeDialog();
    });
    wrapper.update();
    expect(wrapper.find(NoteDialog).props().open).toBeFalsy();
  });
});
