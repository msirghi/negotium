import { Section } from '../../../common/types/tasks.types';

export type TaskWrapperTitleOptions = {
  onSave: (newTitle: string) => void;
  title: string;
  inputFontSize?: number;
  onRemove?: () => void;
};
