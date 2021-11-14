import { Box } from '@mui/system';
import { Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Row } from '../../utilities/row/Row';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  rowItem: {
    marginLeft: 10,
  },
});

export const TaskSkeleton = () => {
  const classes = useStyles();

  return (
    <Box>
      <Skeleton variant="text" width={100} height={40} />
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <Row key={item}>
            <Skeleton animation="wave" variant="text" width={28} height={40} />
            <Skeleton
              animation="wave"
              variant="text"
              width={'100%'}
              className={classes.rowItem}
              height={40}
            />
          </Row>
        );
      })}
    </Box>
  );
};
