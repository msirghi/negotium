import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useFooterStyles = makeStyles({
  link: {
    cursor: 'pointer',
    color: colors.primaries.lightBlue_1,
  },
  container: {
    fontSize: 13,
    textAlign: 'center',
  },
});
