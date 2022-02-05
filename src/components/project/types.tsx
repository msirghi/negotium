import { Project } from '../../common/types/projects.types';

export type ProjectDialogProps = {
  onSubmit: (title: string, color: Project['color']) => void;
  open: boolean;
  setOpen: (status: boolean) => void;
  dialogTitle: string;
  submitButtonTitle?: string;
};
