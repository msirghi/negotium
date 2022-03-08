import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { SiteWrapperDrawer } from '../drawer/SiteWrapperDrawer';
import { If } from '../../utilities/if/If';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { HeaderSearch } from '../search/HeaderSearch';
import { Row } from '../../utilities/row/Row';
import { AccountMenu } from '../account';
import { useRouter } from 'next/router';
import { pagesWithoutWrapper, siteThemes } from '../../../../common/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../../../services/AuthService';
import { setAccountInfo, setMetadata } from '../../../../redux/account/accountSlice';
import { themeMap } from '../../../../common/theme/appTheme';
import { RootState } from '../../../../redux/store';
import AccountService from '../../../../services/AccountService';
import ThemeUtils from '../../../../common/utils/themeUtils';
import { Theme } from '@mui/system';
import { loadNotes } from '../../../../redux/actions/loadNotes';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  appBar: {
    minHeight: 50,
    paddingRight: 0,
  },
}));

export const SiteWrapper: FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const siteTheme = useSelector((state: RootState) => state.account.metadata.theme);
  const isPageWithoutWrapper = pagesWithoutWrapper.includes(router.route);
  const [selectedTheme, setSelectedTheme] = useState<Theme>();
  const dispatch = useDispatch();

  const fetchUserMetadata = async () => {
    try {
      const response = await AccountService.getUserMetadata();
      let { theme, language } = response.data;
      if (!ThemeUtils.isValidTheme(theme)) {
        theme = siteThemes[0].internalKey;
      }
      dispatch(setMetadata({ theme, language }));
      await router.push(router.route, router.route, { locale: language });
    } catch (e) {}
  };

  useEffect(() => {
    setSelectedTheme(themeMap[siteTheme]);
  }, [siteTheme]);

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await AuthService.getUserInfo();
      dispatch(setAccountInfo(userInfo.data));
    } catch (e) {}
  };

  const fetchNotes = async () => {
    dispatch(loadNotes());
  };

  useEffect(() => {
    if (!isPageWithoutWrapper) {
      fetchUserInfo();
      fetchUserMetadata();
      fetchNotes();
    }
  }, [isPageWithoutWrapper]);

  if (!selectedTheme && !isPageWithoutWrapper) {
    return <div />;
  }

  if (isPageWithoutWrapper) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={selectedTheme!}>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar className={classes.appBar} sx={{ backgroundColor: selectedTheme!.palette.primary.main }}>
            <IconButton
              id="menu-icon"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Row alignVerticalCenter>
              <Typography variant="h6" noWrap component="div">
                Negotium
              </Typography>
              <HeaderSearch />
            </Row>
            <Box sx={{ flexGrow: 1 }} />

            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', marginTop: isMobile ? 0 : 6 }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
          >
            <Drawer
              id="drawer"
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                zIndex: 111111,
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              <SiteWrapperDrawer />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              open
            >
              <SiteWrapperDrawer />
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              width: isMobile ? '100%' : { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <If condition={isMobile}>
              <Toolbar />
            </If>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
