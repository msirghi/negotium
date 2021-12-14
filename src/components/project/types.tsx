export type ProjectDialogProps = {
  onSubmit: (title: string) => void;
  open: boolean;
  setOpen: (status: boolean) => void;
  dialogTitle: string;
  submitButtonTitle?: string;
};
