import NoteService from '../../services/NoteService';
import { setNotes } from '../notes/notesSlice';
import { Note } from '../../common/types/notes.types';

export const loadNotes = () => {
  return (dispatch: Function) => {
    return NoteService.getNotes().then((res) => {
      dispatch(setNotes(res as Note[]));
    });
  };
};

const notesActions = {
  loadNotes,
};

export default notesActions;
