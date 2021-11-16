import { SiteWrapperMainList } from '../lists/main/SiteWrapperMainList';
import { SiteWrapperProjectsList } from '../lists/projects/SiteWrapperProjectsList';
import { Box } from '@mui/system';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';

export const SiteWrapperDrawer = () => {
  const isMobile = useIsMobile();

  return (
    <Box sx={{ marginTop: isMobile ? 0 : 8 }}>
      <SiteWrapperMainList />
      <SiteWrapperProjectsList />
    </Box>
  );
};
