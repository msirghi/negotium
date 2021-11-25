import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import colors from '../../../../../common/styles/colors';

const useStyles = makeStyles({
  container: {
    color: colors.greys['500'],
    fontSize: 12
  },
});

export const AppVersion = () => {
  const classes = useStyles();

  return <Box className={classes.container}>Version 0.0.1</Box>;
};
