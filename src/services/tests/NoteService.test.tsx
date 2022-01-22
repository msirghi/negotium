import Requests from '../../common/requests/request';
import ServiceResultFactory from '../../common/requests/serviceResultFactory';
import NoteService from '../NoteService';
import { NotesMock } from '../../common/tests/mockData/notes-mock';

describe('NoteService', () => {
  beforeEach(() => {
    Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve({})) as any;
    ServiceResultFactory.fromResponse = jest.fn();
    ServiceResultFactory.fromError = jest.fn() as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNote', () => {
    it('should handle success response', async () => {
      await NoteService.createNote(NotesMock[0]);
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject({})) as any;
      await NoteService.createNote(NotesMock[0]);
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('getNotes', () => {
    it('should handle success response', async () => {
      await NoteService.getNotes();
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject({})) as any;
      await NoteService.getNotes();
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('removeNoteById', () => {
    it('should handle success response', async () => {
      await NoteService.removeNoteById(NotesMock[0].id);
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject({})) as any;
      await NoteService.removeNoteById(NotesMock[0].id);
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('updateNoteById', () => {
    it('should handle success response', async () => {
      await NoteService.updateNoteById(NotesMock[0]);
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed response', async () => {
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject({})) as any;
      await NoteService.updateNoteById(NotesMock[0]);
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });
});
