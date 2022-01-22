import { CreatedDate, Id, Title, UpdatedDate } from './common.types';

export interface Note
  extends Id<string>,
    CreatedDate,
    Title,
    Partial<UpdatedDate> {
  _id?: string;
  description?: string;
}

export interface NoteUpdate extends Title {
  description?: string;
}
