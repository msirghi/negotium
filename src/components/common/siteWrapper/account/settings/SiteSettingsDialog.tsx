import { FC, useState } from 'react';
import { Dialog, DialogContent, Divider, IconButton } from '@mui/material';
import { Row } from '../../../utilities/row/Row';
import { SettingsDialogMenu } from './menu/SettingsDialogMenu';
import { SETTINGS_OPTIONS } from '../../../../../common/types/enums';
import { If } from '../../../utilities/if/If';
import { AccountSettings } from './account/AccountSettings';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import colors from '../../../../../common/styles/colors';
import CloseIcon from '@mui/icons-material/Close';
import { GeneralSettings } from './general/GeneralSettings';

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const useStyles = makeStyles({
  content: {
    marginTop: 10,
  },
  rightContainer: {
    width: '100%',
    borderLeft: `1px solid ${colors.greys['300']}`,
    paddingLeft: 30,
  },
  title: {
    paddingBottom: 10,
  },
  titleContainer: {
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
});

export const SiteSettingsDialog: FC<Props> = ({ open, setOpen }) => {
  const [selectedItem, setSelectedItem] = useState<SETTINGS_OPTIONS>(
    SETTINGS_OPTIONS.ACCOUNT
  );
  const classes = useStyles();

  const handleClose = () => setOpen(false);

  const getTitle = () => {
    let title = '';
    if (selectedItem === SETTINGS_OPTIONS.ACCOUNT) {
      title = 'Account';
    } else if (selectedItem === SETTINGS_OPTIONS.GENERAL) {
      title = 'General';
    }

    return (
      <Box className={classes.titleContainer}>
        <Box id={'ssd-title'}>{title}</Box>
        <Box className={classes.closeIcon}>
          <IconButton onClick={handleClose} id={'ssd-close-icon'}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
      <DialogContent>
        <Row>
          <SettingsDialogMenu
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <Box className={classes.rightContainer}>
            <Box className={classes.title}>{getTitle()}</Box>
            <Divider />
            <div className={classes.content}>
              <If condition={selectedItem === SETTINGS_OPTIONS.ACCOUNT}>
                <AccountSettings />
              </If>
              <If condition={selectedItem === SETTINGS_OPTIONS.GENERAL}>
                <GeneralSettings />
              </If>
            </div>
          </Box>
        </Row>
      </DialogContent>
    </Dialog>
  );
};
