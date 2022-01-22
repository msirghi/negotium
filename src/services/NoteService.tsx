import { Note, NoteUpdate } from '../common/types/notes.types';
import request from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import ServiceResultFactory from '../common/requests/serviceResultFactory';
import { HttpMethod } from '../common/constants/enums';

const createNote = (note: NoteUpdate) => {
  return request
    .restApiCallWithBearer(`${BASE_API_URL_V1}/notes`, HttpMethod.POST, {
      ...note,
    })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const getNotes = () => {
  return request
    .restApiCallWithBearer(`${BASE_API_URL_V1}/notes`, HttpMethod.GET)
    .then(ServiceResultFactory.fromResponse)
    .then((res) => ServiceResultFactory.convertMongoIdToJSId(res.data))
    .catch(ServiceResultFactory.fromError);
};

const removeNoteById = (noteId: Note['id']) => {
  return request
    .restApiCallWithBearer(
      `${BASE_API_URL_V1}/notes/${noteId}`,
      HttpMethod.DELETE
    )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateNoteById = (note: Note) => {
  return request
    .restApiCallWithBearer(
      `${BASE_API_URL_V1}/notes/${note.id}`,
      HttpMethod.PATCH,
      { ...note }
    )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const NoteService = {
  createNote,
  getNotes,
  removeNoteById,
  updateNoteById,
};

export default NoteService;
