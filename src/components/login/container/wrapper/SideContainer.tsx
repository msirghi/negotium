import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { FC, ReactNode } from 'react';
import { LoginFooter } from '../../footer/LoginFooter';
import { authStyles, useAuthStyles } from './styles';
import { Copyright } from './copyright/Copyright';

type Props = {
  title: string;
  renderFooter?: () => ReactNode;
};

export const SideContainer: FC<Props> = ({ children, title, renderFooter }) => {
  const isMobile = useIsMobile();
  const classes = isMobile ? authStyles.mobile : authStyles.desktop;
  const styles = useAuthStyles();

  return (
    <Box className={styles.container}>
      <Box className={styles.contentBox} sx={{ ...classes.container }}>
        <Box sx={{ ...classes.contentContainer }}>
          <CssBaseline />
          <Grid container component="main">
            <Grid item xs={false} sm={4} md={7} className={styles.imageGridItem} />
            <Grid item xs={12} sm={8} md={5} className={styles.formGridItem} component={Paper} elevation={6} square>
              <Box className={styles.formBox} sx={{ my: 8, mx: 4, ...classes.formContainer }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {title}
                </Typography>
                <Box className={styles.childrenBox}>{children}</Box>
                {renderFooter ? renderFooter() : <LoginFooter />}
                <Copyright sx={{ mt: 2 }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SideContainer;
