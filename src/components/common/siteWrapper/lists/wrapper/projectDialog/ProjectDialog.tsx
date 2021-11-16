import { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';

type Props = {
  onSubmit: (title: string) => void;
  open: boolean;
  setOpen: (status: boolean) => void;
  dialogTitle: string;
};

const useStyles = makeStyles({
  content: {
    padding: '5px 0',
  },
  input: {
    minWidth: (isMobile) => (isMobile ? '100%' : 400),
  },
  buttons: {
    marginTop: 10,
  },
});

export const ProjectDialog: FC<Props> = ({
  open,
  setOpen,
  dialogTitle,
  onSubmit,
}) => {
  const isMobile = useIsMobile();
  const classes = useStyles(isMobile);

  const [name, setName] = useState('');

  useEffect(() => {
    setName('');
  }, [open]);

  const onSave = () => {
    onSubmit(name);
    handleClose();
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={isMobile}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Box className={classes.content}>
          <TextField
            className={classes.input}
            size={'small'}
            label={'Name'}
            inputProps={{'data-testid': 'name-field'}}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Box>

        <DialogActions className={classes.buttons}>
          <Button fullWidth={isMobile} onClick={handleClose} data-testid={'cancel-button'}>
            Cancel
          </Button>
          <Button
            variant={'contained'}
            data-testid={'save-button'}
            fullWidth={isMobile}
            disabled={!name}
            onClick={onSave}
          >
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
