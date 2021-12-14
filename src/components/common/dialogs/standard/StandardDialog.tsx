import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
} from '@mui/material';
import { FC } from 'react';
import { DialogOptions } from './types';
import { makeStyles } from '@mui/styles';
import colors from '../../../../common/styles/colors';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/system';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';

type Props = {
  open: boolean;
  onSubmit: () => void;
  setOpen: (val: boolean) => void;
  options: DialogOptions;
  hideBackdrop?: boolean;
};

const useStyles = makeStyles({
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
  content: {
    padding: '35px 0 20px 0',
  },
});

export const StandardDialog: FC<Props> = ({
  open,
  setOpen,
  options,
  onSubmit,
  children,
  hideBackdrop,
}) => {
  const { dialogTitle, cancelButtonLabel, submitButtonLabel, infoMessage } =
    options;
  const classes = useStyles();
  const isMobile = useIsMobile();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} hideBackdrop={hideBackdrop}>
      <DialogTitle className={classes.titleContainer}>
        <div>{dialogTitle}</div>
        <Divider className={classes.divider} />
        {options.infoMessage && (
          <Tooltip title={options.infoMessage}>
            <InfoOutlinedIcon data-testid={'info-icon'} className={classes.info} fontSize={'small'} />
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent>
        <Box className={classes.content}>{children}</Box>
      </DialogContent>

      <DialogActions className={classes.buttons}>
        <Button
          fullWidth={isMobile}
          onClick={handleClose}
          data-testid={'cancel-button'}
          size={'small'}
        >
          {cancelButtonLabel}
        </Button>
        <Button
          size={'small'}
          variant={'contained'}
          data-testid={'save-button'}
          fullWidth={isMobile}
          onClick={onSubmit}
        >
          {submitButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
