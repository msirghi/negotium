import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

const useStyles = makeStyles({
  root: {
    // @ts-ignore
    width: (isMobile: boolean) => (isMobile ? '100%' : '50%'),
    padding: 20,
  },
});

export const ContentBox: FC = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles(isMobile);

  return <Box className={classes.root}>{children}</Box>;
};
