import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import useTranslation from 'next-translate/useTranslation';
import { HeaderLink } from './link/HeaderLink';

interface Props {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: Props) => {
  return React.cloneElement(children, { elevation: 2 });
};

export const LandingHeader = (props: Props) => {
  const { t } = useTranslation('landing');

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
              <HeaderLink title={t('features')} />
              <HeaderLink title={t('help')} />
              <HeaderLink title={t('download')} />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box>{props.children}</Box>
    </>
  );
};
