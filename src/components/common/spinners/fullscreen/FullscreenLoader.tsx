import { makeStyles } from '@mui/styles';
import Loader from 'react-loader-spinner';
import { Box } from '@mui/system';
import colors from '../../../../common/styles/colors';

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
  },
  spinner: {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

export const FullscreenLoader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <div className={classes.spinner}>
        <Loader type="Watch" color={colors.primaries.darkBlue} height={100} width={100} />
      </div>
    </Box>
  );
};
