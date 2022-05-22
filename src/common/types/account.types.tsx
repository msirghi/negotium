import { Id } from './common.types';

export interface AccountInfo extends Id<string> {
  name: string;
  email: string;
}

export type AccountMetadata = {
  theme: string;
  language: string;
  defaultHomeView: string;
};
