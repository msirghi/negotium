import { SiteWrapperMainList } from '../lists/main/SiteWrapperMainList';
import { SiteWrapperProjectsList } from '../lists/projects/SiteWrapperProjectsList';
import { Box } from '@mui/system';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    marginTop: (isMobile) => (isMobile ? 0 : 60),
  },
});

export const SiteWrapperDrawer = () => {
  const isMobile = useIsMobile();
  const classes = useStyles(isMobile);

  return (
    <Box className={classes.root}>
      <SiteWrapperMainList />
      <SiteWrapperProjectsList />
    </Box>
  );
};
