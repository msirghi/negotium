import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SiteWrapperDrawer } from '../drawer/SiteWrapperDrawer';

type Props = {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

export const SiteWrapperNavigation = ({ drawerWidth, handleDrawerToggle, mobileOpen }: Props) => {
  return (
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
  );
};
