import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { memo } from 'react';

const skeletonHeight = 30;

export const MenuSkeleton = () => {
  return (
    <Box sx={{ padding: 1.5 }}>
      {[1, 2, 3, 4].map((key) => (
        <Skeleton key={key} variant="text" height={skeletonHeight} />
      ))}
    </Box>
  );
};

export default memo(MenuSkeleton);
