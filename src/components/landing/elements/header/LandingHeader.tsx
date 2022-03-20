import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const ElevationScroll = (props: Props) => {
  const { children } = props;

  return React.cloneElement(children, {
    elevation: 2,
  });
};

export const LandingHeader = (props: Props) => {
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ backgroundColor: '#fff', color: 'black', padding: '0 8%' }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Negotium
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex', padding: '0 10%' } }}>
              <Box style={{ padding: '0 10px' }}>
                <Button color={'inherit'}>Features</Button>
              </Box>
              <Box style={{ padding: '0 10px' }}>
                <Button color={'inherit'}>Help</Button>
              </Box>
              <Box style={{ padding: '0 10px' }}>
                <Button color={'inherit'}>Download</Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box>{props.children}</Box>
    </>
  );
};
