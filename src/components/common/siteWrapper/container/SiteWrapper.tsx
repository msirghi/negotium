import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { SiteWrapperDrawer } from '../drawer/SiteWrapperDrawer';
import { If } from '../../utilities/if/If';
import colors from '../../../../common/styles/colors';
import { makeStyles } from '@mui/styles';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { HeaderSearch } from '../search/HeaderSearch';
import { Row } from '../../utilities/row/Row';
import { AccountCircle } from '@mui/icons-material';
import {AccountMenu} from "../account";

const drawerWidth = 240;

const useStyles = makeStyles({
  appBar: {
    minHeight: 50,
    backgroundColor: colors.greys['900'],
    paddingRight: 0,
  },
});

export const SiteWrapper: FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar className={classes.appBar}>
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
            ModalProps={{
              keepMounted: true,
            }}
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
  );
};
