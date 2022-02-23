import NoteService from '../../../services/NoteService';
import { NotesMock } from '../../../common/tests/mockData/notes-mock';
import { loadNotes } from '../loadNotes';

describe('loadNotes', () => {
  afterEach(jest.clearAllMocks);

  beforeEach(() => {
    jest.spyOn(NoteService, 'getNotes').mockImplementation(() => Promise.resolve(NotesMock));
  });

  it('should handle api call', async () => {
    const func = loadNotes();
    await func(jest.fn());
    expect(NoteService.getNotes).toBeCalled();
  });
});
