import { Id } from './common.types';

export interface Note extends Id<string> {
  title: string;
  description?: string;
}
