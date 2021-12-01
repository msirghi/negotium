import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useAuthContainerStyles = makeStyles({
  container: {
    height: '100vh',
    backgroundColor: colors.greys['100'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCard: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 390,
    minHeight: 650,
    borderRadius: 20,
    boxShadow: '0 5px 10px 0px rgb(0 0 0 / 10%)',
    backgroundColor: colors.white,
    padding: '77px 55px 33px 55px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  loginForm: {},
  iconContainer: {
    marginTop: 20,
  },
  icon: {
    fontSize: '55px !important',
  },
  loginFooter: {
    marginTop: 'auto',
  },
});
