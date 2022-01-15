import { Note } from '../../types/notes.types';
import TestUtils from '../TestUtils';

export const NotesMock: Note[] = [
  {
    id: '1',
    title: 'Note 1',
    description: TestUtils.testData.fakeTitle,
  },
  {
    id: '2',
    title: 'Note 2',
    description: TestUtils.testData.fakeTitle,
  },
  {
    id: '3',
    title: 'Note 3',
    description: TestUtils.testData.fakeTitle,
  },
  {
    id: '4',
    title: 'Note 4',
    description: TestUtils.testData.fakeTitle,
  },
];
