import { Id } from './common.types';

export interface Project extends Id<string> {
  _id?: string;
  name: string;
  color?: string;
}
