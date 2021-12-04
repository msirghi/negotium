import { Skeleton } from '@mui/material';
import { useThemeItemStyles } from '../item/styles';
import { Row } from '../../../../../utilities/row/Row';

export const ThemeBodySkeleton = () => {
  const classes = useThemeItemStyles({});

  return (
    <Row alignVerticalCenter>
      <Skeleton variant="rectangular" width={10} height={9} animation={false} />
      <Skeleton
        className={classes.textSkeleton}
        width={'100%'}
        height={15}
        animation={false}
      />
    </Row>
  );
};
