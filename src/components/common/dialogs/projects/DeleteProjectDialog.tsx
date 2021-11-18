import { StandardDialog } from '../standard/StandardDialog';
import { FC } from 'react';
import { DialogOptions } from '../standard/types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSubmit: () => void;
};

const useStyles = makeStyles({
  content: {
    textAlign: 'center',
    lineHeight: 1,
  },
});

export const DeleteProjectDialog: FC<Props> = ({ open, onSubmit, setOpen }) => {
  const options: DialogOptions = {
    dialogTitle: 'Delete project',
    cancelButtonLabel: 'Cancel',
    submitButtonLabel: 'Submit',
  };

  const classes = useStyles();

  return (
    <StandardDialog
      open={open}
      onSubmit={onSubmit}
      setOpen={setOpen}
      options={options}
    >
      <Box className={classes.content}>
        The project and all tasks associated with it will be deleted. <pre />{' '}
        Are you sure?
      </Box>
    </StandardDialog>
  );
};
