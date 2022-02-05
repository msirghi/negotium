import { FC, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide, TextField, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';
import { ProjectDialogProps } from '../../../../../project/types';
import { Project } from '../../../../../../common/types/projects.types';
import { ColorSelector } from '../colorSelector/ColorSelector';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TransitionProps } from '@mui/material/transitions';
import { PROJECT_COLORS } from '../../../../../../common/constants/constants';
import { InputChangeEvent } from '../../../../../../common/types/common.types';
import { useProjectDialogStyles } from './styles';

type Props = {
  selectedProject?: Project;
} & ProjectDialogProps;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ProjectDialog: FC<Props> = ({ open, setOpen, dialogTitle, onSubmit, selectedProject, submitButtonTitle }) => {
  const isMobile = useIsMobile();
  const classes = useProjectDialogStyles(isMobile);
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0].color);
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedProject && selectedProject.name) {
      setName(selectedProject.name);
      setSelectedColor(selectedProject.color!);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) {
      setName('');
    }
  }, [open]);

  const onSave = () => {
    onSubmit(name, selectedColor);
    handleClose();
  };

  const handleClose = () => setOpen(false);

  const handleNameChange = () => {
    return (e: InputChangeEvent) => setName(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={isMobile}
      classes={{ scrollPaper: classes.scrollPaper }}
      // hideBackdrop
      // TransitionComponent={Transition}
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
            onChange={handleNameChange()}
            value={name}
          />
          <ColorSelector color={selectedColor} setColor={setSelectedColor} />
        </Box>
        <DialogActions className={classes.buttons}>
          <Button fullWidth={isMobile} onClick={handleClose} data-testid={'cancel-button'} size={'small'}>
            Cancel
          </Button>
          <Button size={'small'} variant={'contained'} data-testid={'save-button'} fullWidth={isMobile} disabled={!name} onClick={onSave}>
            {submitButtonTitle || 'Add'}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
