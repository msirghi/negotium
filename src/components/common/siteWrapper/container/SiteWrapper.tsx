import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { FC, useEffect, useState } from 'react';
import { If } from '../../utilities/if/If';
import { ThemeProvider } from '@mui/material/styles';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
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
import notesActions from '../../../../redux/actions/loadNotes';
import taskActions from '../../../../redux/actions/loadTasks';
import NextNProgress from 'nextjs-progressbar';
import { SiteWrapperHeader } from '../header/SiteWrapperHeader';
import { SiteWrapperNavigation } from '../navigation/SiteWrapperNavigation';
import { useMetadataActions } from '../account/settings/general/hooks/useMetadataActions';

const drawerWidth = 240;

export const SiteWrapper: FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const siteTheme = useSelector((state: RootState) => state.account.metadata.theme);
  const isPageWithoutWrapper = pagesWithoutWrapper.includes(router.route);
  const [selectedTheme, setSelectedTheme] = useState<Theme>();
  const dispatch = useDispatch();
  const { routeToHomePage, loading: routerLoading } = useMetadataActions();

  const fetchUserMetadata = async () => {
    try {
      const response = await AccountService.getUserMetadata();
      let { theme, language, defaultHomeView } = response.data;
      if (!ThemeUtils.isValidTheme(theme)) {
        theme = siteThemes[0].internalKey;
      }
      dispatch(setMetadata({ theme, language, defaultHomeView }));
      routeToHomePage(defaultHomeView, language);
    } catch (e) {}
  };

  useEffect(() => {
    setSelectedTheme(themeMap[siteTheme]);
  }, [siteTheme]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await AuthService.getUserInfo();
      dispatch(setAccountInfo(userInfo.data));
    } catch (e) {}
  };

  const fetchNotes = () => {
    dispatch(notesActions.loadNotes());
  };

  const fetchTasks = () => {
    dispatch(taskActions.loadTasks());
  };

  useEffect(() => {
    if (!isPageWithoutWrapper) {
      fetchUserInfo();
      fetchUserMetadata();
      fetchNotes();
      fetchTasks();
    }
  }, [isPageWithoutWrapper]);

  if ((!selectedTheme && !isPageWithoutWrapper) || routerLoading) {
    return <div />;
  }

  if (isPageWithoutWrapper) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={selectedTheme!}>
      <NextNProgress color={selectedTheme?.palette.custom.progressBarColor} />
      <Box>
        <SiteWrapperHeader selectedTheme={selectedTheme!} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
        <Box sx={{ display: 'flex', marginTop: isMobile ? 0 : 6 }}>
          <CssBaseline />
          <SiteWrapperNavigation drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ width: isMobile ? '100%' : { sm: `calc(100% - ${drawerWidth}px)` } }}>
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
