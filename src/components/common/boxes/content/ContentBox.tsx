import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';

const useStyles = makeStyles({
  root: {
    width: (isMobile) => (isMobile ? '100%' : '50%'),
    padding: 20,
  },
});

export const ContentBox: FC = ({ children }) => {
  const isMobile = useIsMobile();
  const classes = useStyles(isMobile);

  return <Box className={classes.root}>{children}</Box>;
};
