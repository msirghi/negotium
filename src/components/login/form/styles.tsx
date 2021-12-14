import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useLoginFormStyles = makeStyles({
  field: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
  error: {
    marginTop: 20,
    color: colors.error.main,
    textAlign: 'center',
  },
});
