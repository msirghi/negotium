import { makeStyles } from '@mui/styles';
import colors from '../../../../../../common/styles/colors';

export const useProjectDialogStyles = makeStyles({
  content: {
    padding: '35px 0 20px 0',
  },
  input: {
    minWidth: (isMobile) => (isMobile ? '100%' : 400),
  },
  buttons: {
    marginTop: 10,
  },
  titleContainer: {
    position: 'relative',
    backgroundColor: colors.greys['100'],
  },
  divider: {
    position: 'absolute',
    width: '100%',
    left: 0,
    marginTop: 15,
  },
  info: {
    position: 'absolute',
    cursor: 'pointer',
    right: '5%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  scrollPaper: {
    alignItems: 'baseline',
  },
});
