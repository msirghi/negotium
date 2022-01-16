import { CreatedDate, Id, Title } from './common.types';

export interface Note extends Id<string>, CreatedDate, Title {
  _id?: string;
  description?: string;
}

export interface NoteUpdate extends Title {
  description?: string;
}
