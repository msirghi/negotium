import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useEmptyListMessageStyles = makeStyles({
  image: {
    marginTop: 15,
    width: 150,
    '-webkit-filter': 'grayscale(100%)' /* Safari 6.0 - 9.0 */,
    filter: 'grayscale(100%)',
  },
  message: {
    fontSize: 18,
    color: colors.greys['600'],
    textAlign: 'center'
  },
});
