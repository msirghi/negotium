import { FC, useEffect, useState } from 'react';
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
import { useTranslation } from 'next-i18next';
import { ThemeSettings } from './theme/ThemeSettings';
import { useSiteSettingsDialogStyles } from './styles';

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  defaultPage?: SETTINGS_OPTIONS;
};

export const SiteSettingsDialog: FC<Props> = ({
  open,
  setOpen,
  defaultPage,
}) => {
  const [selectedItem, setSelectedItem] = useState<SETTINGS_OPTIONS>(
    SETTINGS_OPTIONS.ACCOUNT
  );
  const { t } = useTranslation('settings');
  const classes = useSiteSettingsDialogStyles();

  useEffect(() => {
    if (defaultPage) {
      setSelectedItem(defaultPage);
    }
  }, [defaultPage]);

  const handleClose = () => setOpen(false);

  const getTitle = () => {
    let title = '';
    if (selectedItem === SETTINGS_OPTIONS.ACCOUNT) {
      title = t('titles.account');
    } else if (selectedItem === SETTINGS_OPTIONS.GENERAL) {
      title = t('titles.general');
    } else if (selectedItem === SETTINGS_OPTIONS.THEMES) {
      title = t('titles.themes');
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
      <DialogContent style={{ height: 500 }}>
        <Row className={classes.container}>
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
              <If condition={selectedItem === SETTINGS_OPTIONS.THEMES}>
                <ThemeSettings />
              </If>
            </div>
          </Box>
        </Row>
      </DialogContent>
    </Dialog>
  );
};
