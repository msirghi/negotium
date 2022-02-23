import NoteService from '../../../services/NoteService';
import { NotesMock } from '../../../common/tests/mockData/notes-mock';
import { SnackbarProvider } from 'notistack';
import { NotesContainer } from './NotesContainer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import TestUtils, { MockReduxProvider } from '../../../common/tests/TestUtils';
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
        <MockReduxProvider reduxStore={{ notes: { notes: NotesMock } }}>
          <NotesContainer />
        </MockReduxProvider>
      </SnackbarProvider>
    );
  };

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
