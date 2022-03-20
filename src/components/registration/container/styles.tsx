import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useRegistrationContainerStyles = makeStyles({
  link: {
    cursor: 'pointer',
    color: colors.primaries.lightBlue_1,
  },
  container: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});
