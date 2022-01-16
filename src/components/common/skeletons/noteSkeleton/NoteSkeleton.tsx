import { Grid, Skeleton } from '@mui/material';
import { useNoteSkeletonStyles } from './styles';
import { ContentBox } from '../../boxes/content/ContentBox';
import { NoteSkeletonRow } from './row/NoteSkeletonRow';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';

export const NoteSkeleton = () => {
  const classes = useNoteSkeletonStyles();
  const isMobile = useIsMobile();

  return (
    <ContentBox skipWidthChange>
      <div className={classes.inputContainer}>
        <Skeleton
          width={isMobile ? '100%' : '33%'}
          className={classes.inputSkeleton}
          height={50}
        />
      </div>
      <Grid container>
        <NoteSkeletonRow />
        <NoteSkeletonRow />
        <NoteSkeletonRow />
      </Grid>
    </ContentBox>
  );
};
