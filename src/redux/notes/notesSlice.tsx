import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../common/types/notes.types';

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((p) => p.id !== action.payload);
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
    },
  },
});

export const { addNote, removeNote, setNotes } = notesSlice.actions;

export default notesSlice.reducer;
