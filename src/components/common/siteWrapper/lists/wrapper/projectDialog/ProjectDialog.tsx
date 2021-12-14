import { FC, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  TextField,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';
import { ProjectDialogProps } from '../../../../../project/types';
import { IProject } from '../../../../../../common/types/projects.types';
import { ColorSelector } from '../colorSelector/ColorSelector';
import colors from '../../../../../../common/styles/colors';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TransitionProps } from '@mui/material/transitions';

const useStyles = makeStyles({
  content: {
    padding: '35px 0 20px 0',
  },
  input: {
    minWidth: (isMobile) => (isMobile ? '100%' : 400),
  },
  buttons: {
    marginTop: 10,
  },
  titleContainer: {
    position: 'relative',
    backgroundColor: colors.greys['100'],
  },
  divider: {
    position: 'absolute',
    width: '100%',
    left: 0,
    marginTop: 15,
  },
  info: {
    position: 'absolute',
    cursor: 'pointer',
    right: '5%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  scrollPaper: {
    alignItems: 'baseline',
  },
});

type Props = {
  selectedProject?: IProject;
} & ProjectDialogProps;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ProjectDialog: FC<Props> = ({
  open,
  setOpen,
  dialogTitle,
  onSubmit,
  selectedProject,
  submitButtonTitle,
}) => {
  const isMobile = useIsMobile();
  const classes = useStyles(isMobile);
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedProject && selectedProject.name) {
      setName(selectedProject.name);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) {
      setName('');
    }
  }, [open]);

  const onSave = () => {
    onSubmit(name);
    handleClose();
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={isMobile}
      classes={{ scrollPaper: classes.scrollPaper }}
      hideBackdrop
      TransitionComponent={Transition}
    >
      <DialogTitle className={classes.titleContainer}>
        <div>{dialogTitle}</div>
        <Divider className={classes.divider} />
        <Tooltip title="Info">
          <InfoOutlinedIcon className={classes.info} fontSize={'small'} />
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.content}>
          <TextField
            className={classes.input}
            size={'small'}
            label={'Name'}
            inputProps={{ 'data-testid': 'name-field' }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <ColorSelector />
        </Box>
        <DialogActions className={classes.buttons}>
          <Button
            fullWidth={isMobile}
            onClick={handleClose}
            data-testid={'cancel-button'}
            size={'small'}
          >
            Cancel
          </Button>
          <Button
            size={'small'}
            variant={'contained'}
            data-testid={'save-button'}
            fullWidth={isMobile}
            disabled={!name}
            onClick={onSave}
          >
            {submitButtonTitle || 'Add'}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
