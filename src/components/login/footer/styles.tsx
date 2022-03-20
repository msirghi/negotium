import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useFooterStyles = makeStyles({
  link: {
    cursor: 'pointer',
    color: colors.primaries.lightBlue_1,
  },
  container: {
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
  },
});
