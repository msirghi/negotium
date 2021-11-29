import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    color: colors.primaries.lightBlue_1,
  },
  container: {
    fontSize: 13,
    textAlign: 'center'
  },
});

export const LoginFooter = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      Don’t have an account? <span className={classes.link}>Sign Up</span>
    </div>
  );
};
