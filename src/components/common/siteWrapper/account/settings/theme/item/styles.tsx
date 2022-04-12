import { makeStyles } from '@mui/styles';
import colors from '../../../../../../../common/styles/colors';

export const useThemeItemStyles = makeStyles({
  container: {
    width: 185,
    border: `1px solid ${colors.greys['300']}`,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'transform 250ms',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  title: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: (props: { color?: string, textColor?: string }) => props.color,
    color: (props: { textColor?: string, color?: string }) => props.textColor || colors.white,
    height: 35,
    padding: 6,
    fontSize: 14,
  },
  skeleton: {
    height: 75,
    padding: 5,
  },
  textSkeleton: {
    borderRadius: 1,
    marginLeft: 5,
    marginBottom: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
    marginRight: 5,
  },
});
