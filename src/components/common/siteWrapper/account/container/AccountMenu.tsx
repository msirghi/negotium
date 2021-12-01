import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import { Avatar, Divider, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { AccountInfo } from '../../../../../common/types/account.types';
import { makeStyles } from '@mui/styles';
import { deepOrange } from '@mui/material/colors';
import { Row } from '../../../utilities/row/Row';
import { Box } from '@mui/system';
import colors from '../../../../../common/styles/colors';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AppVersion } from '../version/AppVersion';
import { ChangeLog } from '../changelog/ChangeLog';
import { useCommonStyles } from '../styles';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { SiteSettingsDialog } from '../settings/SiteSettingsDialog';
import { useTranslation } from 'next-i18next';
import {useRouter} from "next/router";

const useStyles = makeStyles({
  accountContainer: {
    minWidth: 300,
    maxWidth: 450
  },
  accountTitles: {
    marginLeft: 15,
    fontSize: 14,
  },
  email: {
    color: colors.greys['600'],
  },
  name: {
    fontWeight: 'bold',
  },
});

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const accountInfo: AccountInfo = useSelector(
    (state: RootState) => state.account.info
  );
  const classes = useStyles();
  const commonStyles = useCommonStyles();
  const [isSettingsDialogOpened, setSettingsDialogOpened] = useState(false);
  const { t } = useTranslation('settings');
  const router = useRouter();

  const handleLogout = async() => {
    localStorage.removeItem('rt');
    await router.push('/login');
  }

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSettingsItemClick = () => {
    handleClose();
    setSettingsDialogOpened(true);
  };

  return (
    <>
      <SiteSettingsDialog
        open={isSettingsDialogOpened}
        setOpen={setSettingsDialogOpened}
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
        <MenuItem>
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

        <MenuItem onClick={handleClose}>
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
