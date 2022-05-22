import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TaskAddButton } from '../../../content/taskWrapper/section/taskAdd/TaskAddButton';
import { Nullable } from '../../../../../common/types/common.types';
import { useTasksActions } from '../../../../../common/hooks/tasks/useTasksActions';
import { makeStyles } from '@mui/styles';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    top: 50,
  },
});

export const TaskAddDialog = ({ open, handleClose }: Props) => {
  const { handleTaskAdd } = useTasksActions();
  const classes = useStyles();

  const onTaskAdd = (title: string, date: Nullable<Date>) => {
    handleTaskAdd(title, date);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      hideBackdrop
      classes={{ paper: classes.dialog }}
    >
      <DialogContent>
        <TaskAddButton defaultOpened onTaskAdd={onTaskAdd} cancelCallback={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
