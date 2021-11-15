import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { SiteWrapperDrawer } from '../drawer/SiteWrapperDrawer';
import { If } from '../../utilities/if/If';
import colors from '../../../../common/styles/colors';

const drawerWidth = 240;

export const SiteWrapper: FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <If condition={isMobile}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ backgroundColor: colors.primaries.lightBlue_1 }}>
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
            <Typography variant="h6" noWrap component="div">
              Negotium
            </Typography>
          </Toolbar>
        </AppBar>
      </If>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          // flexGrow: 1,
          // p: 3,
          width: isMobile ? 'initial' : { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <If condition={isMobile}>
          <Toolbar />
        </If>
        {children}
      </Box>
    </Box>
  );
};
