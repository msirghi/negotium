import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';

const useStyles = makeStyles({
  root: {
    width: (isMobile) => (isMobile ? '100%' : '50%'),
    padding: 20,
    overflowY: 'auto',
    maxHeight: '95vh',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 10,
    }
  },
});

type Props = {
  skipWidthChange?: boolean;
}

export const ContentBox: FC<Props> = ({ children, skipWidthChange }) => {
  const isMobile = useIsMobile();
  const classes = useStyles(skipWidthChange || isMobile);

  return <Box className={classes.root}>{children}</Box>;
};
