import { makeStyles } from '@mui/styles';
import colors from '../../../../../common/styles/colors';

export const useSiteSettingsDialogStyles = makeStyles({
  container: {
    height: '100%',
  },
  content: {
    marginTop: 10,
    height: '100%',
  },
  rightContainer: {
    width: '100%',
    borderLeft: `1px solid ${colors.greys['300']}`,
    paddingLeft: 30,
    height: '90%'
  },
  title: {
    paddingBottom: 10,
  },
  titleContainer: {
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
});
