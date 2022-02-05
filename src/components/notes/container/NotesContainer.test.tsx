import NoteService from '../../../services/NoteService';
import { NotesMock } from '../../../common/tests/mockData/notes-mock';
import { SnackbarProvider } from 'notistack';
import { NotesContainer } from './NotesContainer';
import { NoteSkeleton } from '../../common/skeletons/noteSkeleton/NoteSkeleton';
import { mount } from 'enzyme';
import { fireEvent, render, waitFor } from '@testing-library/react';
import TestUtils from '../../../common/tests/TestUtils';
import { act } from 'react-dom/test-utils';

require('setimmediate');

describe('NotesContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(NoteService, 'getNotes').mockImplementation(() => Promise.resolve(NotesMock));
  });

  const renderComponent = () => {
    return (
      <SnackbarProvider>
        <NotesContainer />
      </SnackbarProvider>
    );
  };

  it('should render loader on initial render', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(NoteSkeleton)).not.toHaveLength(0);
  });

  it('should render note items', async () => {
    const { getByTestId } = render(renderComponent());
    await TestUtils.runAllPromises();
    await waitFor(() => {
      expect(getByTestId('content')).toBeInTheDocument();
    });
  });

  it('should handle note delete', async () => {
    jest.spyOn(NoteService, 'removeNoteById').mockImplementation();
    const { getAllByTestId } = render(renderComponent());

    await waitFor(() => {
      const deleteBtn = getAllByTestId('delete-note-btn')[0];
      act(() => {
        fireEvent.click(deleteBtn);
      });
      expect(NoteService.removeNoteById).toBeCalled();
    });
  });
});
