import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import useTranslation from 'next-translate/useTranslation';
import { HeaderLink } from './link/HeaderLink';
import Image from 'next/image';
import { Row } from '../../../common/utilities/row/Row';
import { useLandingHeaderStyles } from './styles';

interface Props {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: Props) => {
  return React.cloneElement(children, { elevation: 2 });
};

export const LandingHeader = (props: Props) => {
  const { t } = useTranslation('landing');
  const classes = useLandingHeaderStyles();

  const scroll = (id: string) => {
    document.getElementById(id)!.scrollIntoView({ behavior: 'smooth' });
  }

  const onLogoClick = () => scroll('landing-start')

  const onFeaturesClick = () => scroll('landing-features');

  const onStartClick = () => scroll('start-section')

  return (
    <>
      <div id="landing-start"/>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" component="div" onClick={onLogoClick}>
              <Row alignVerticalCenter className={classes.logoContainer}>
                <Image src={'/static/logo.png'} width={50} height={50} />
                <span className={classes.logoText}>Negotium</span>
              </Row>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex', padding: '0 10%' } }}>
              <HeaderLink title={t('features')} onClick={onFeaturesClick} />
              <HeaderLink title={t('help')} />
              <HeaderLink title={t('start')} onClick={onStartClick}/>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box>{props.children}</Box>
    </>
  );
};
