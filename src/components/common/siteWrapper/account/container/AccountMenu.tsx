import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import { MouseEvent, useRef, useState } from 'react';
import { Avatar, Divider, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { AccountInfo } from '../../../../../common/types/account.types';
import { deepOrange } from '@mui/material/colors';
import { Row } from '../../../utilities/row/Row';
import { Box } from '@mui/system';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AppVersion } from '../version/AppVersion';
import { ChangeLog } from '../changelog/ChangeLog';
import { useCommonStyles } from '../styles';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { SiteSettingsDialog } from '../settings/SiteSettingsDialog';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { SETTINGS_OPTIONS } from '../../../../../common/types/enums';
import { useAccountMenuStyles } from './styles';

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const accountInfo: AccountInfo = useSelector(
    (state: RootState) => state.account.info
  );
  const defaultSettingsPage = useRef<SETTINGS_OPTIONS>();
  const classes = useAccountMenuStyles();
  const commonStyles = useCommonStyles();
  const [isSettingsDialogOpened, setSettingsDialogOpened] = useState(false);
  const { t } = useTranslation('settings');
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('rt');
    await router.push('/login');
  };

  const onThemesItemClick = () => {
    defaultSettingsPage.current = SETTINGS_OPTIONS.THEMES;
    setSettingsDialogOpened(true);
    handleClose();
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSettingsItemClick = () => {
    defaultSettingsPage.current = undefined;
    handleClose();
    setSettingsDialogOpened(true);
  };

  return (
    <>
      <SiteSettingsDialog
        open={isSettingsDialogOpened}
        setOpen={setSettingsDialogOpened}
        defaultPage={defaultSettingsPage.current}
      />

      <IconButton
        id={'account-circle'}
        size="large"
        color="inherit"
        sx={{ marginRight: 2 }}
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>

      <Menu
        className={classes.accountContainer}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <Row alignVerticalCenter>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {accountInfo.name[0]}
            </Avatar>
            <Box className={classes.accountTitles}>
              <div className={classes.name}>{accountInfo.name}</div>
              <div className={classes.email}>{accountInfo.email}</div>
            </Box>
          </Row>
        </MenuItem>

        <Divider />

        <MenuItem onClick={onSettingsItemClick} id={'settings-item'}>
          <Row alignVerticalCenter>
            <SettingsIcon fontSize={'small'} />
            <span className={commonStyles.itemTitle}>
              {t('titles.settings')}
            </span>
          </Row>
        </MenuItem>

        <MenuItem onClick={onThemesItemClick}>
          <Row alignVerticalCenter>
            <PaletteOutlinedIcon fontSize={'small'} />
            <span className={commonStyles.itemTitle}>{t('titles.themes')}</span>
          </Row>
        </MenuItem>

        <ChangeLog closeMenu={handleClose} />

        <MenuItem onClick={handleLogout}>
          <Row alignVerticalCenter>
            <ExitToAppOutlinedIcon fontSize={'small'} />
            <span className={commonStyles.itemTitle}>{t('titles.logOut')}</span>
          </Row>
        </MenuItem>

        <Divider />
        <MenuItem disableRipple>
          <AppVersion />
        </MenuItem>
      </Menu>
    </>
  );
};
