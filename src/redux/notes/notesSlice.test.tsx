import reducer, { setNotes, addNote, removeNote } from './notesSlice';
import { NotesMock } from '../../common/tests/mockData/notes-mock';

describe('Notes slice', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, { type: 'type' });

    expect(result).toEqual({
      notes: [],
    });
  });

  it('should handle note set', () => {
    const result = reducer({ notes: [] }, setNotes(NotesMock));

    expect(result).toEqual({
      notes: NotesMock,
    });
  });

  it('should handle note add', () => {
    const result = reducer({ notes: NotesMock }, addNote(NotesMock[0]));
    expect(result.notes).toHaveLength(NotesMock.length + 1);
  });

  it('should handle note removal from state', () => {
    const result = reducer({ notes: NotesMock }, removeNote(NotesMock[0].id));
    expect(result.notes).toHaveLength(NotesMock.length - 1);
  });
});
