import { makeStyles } from '@mui/styles';
import Loader from 'react-loader-spinner';
import { appTheme } from '../../../../common/theme/appTheme';
import { Box } from '@mui/system';

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
        <Loader
          type="Watch"
          color={appTheme.palette.primary.main}
          height={100}
          width={100}
        />
      </div>
    </Box>
  );
};
