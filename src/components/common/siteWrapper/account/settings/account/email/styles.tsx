import { makeStyles } from '@mui/styles';
import colors from '../../../../../../../common/styles/colors';

export const useEmailChangeStyles = makeStyles({
  container: {},
  formContainer: {
    marginTop: 10,
    flexDirection: 'column',
  },
  input: {
    marginTop: 20,
    minWidth: '70%',
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
  },
  error: {
    color: colors.error.main,
    fontSize: 14,
  },
});
