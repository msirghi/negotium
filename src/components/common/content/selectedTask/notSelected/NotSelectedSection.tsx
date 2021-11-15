import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import colors from '../../../../../common/styles/colors';

const useStyles = makeStyles({
  root: {
    height: '95%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    color: colors.greys['600'],
  },
});

export const NotSelectedSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <CenterFocusWeakIcon color={'primary'} fontSize={'large'} />
      </Box>
      <Box className={classes.title}>Click on task to select it.</Box>
    </Box>
  );
};
