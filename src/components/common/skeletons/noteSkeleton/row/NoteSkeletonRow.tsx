import { useNoteSkeletonStyles } from '../styles';
import { Row } from '../../../utilities/row/Row';
import { Grid, Skeleton } from '@mui/material';

const gridItemSizes = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4,
} as any;

export const NoteSkeletonRow = () => {
  const classes = useNoteSkeletonStyles();
  return (
    <>
      <Grid item {...gridItemSizes}>
        <Skeleton className={classes.noteSkeleton} height={240} />
      </Grid>
      <Grid item {...gridItemSizes}>
        <Skeleton className={classes.noteSkeleton} height={240} />
      </Grid>
      <Grid item {...gridItemSizes}>
        <Skeleton className={classes.noteSkeleton} height={240} />
      </Grid>
    </>
  );
};
