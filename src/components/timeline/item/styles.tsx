import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useTimelineItemStyles = makeStyles({
  container: (props: { active: boolean; defaultColor: string; activeColor: string }) => {
    return {
      backgroundColor: props.active ? props.activeColor : props.defaultColor,
      transition: 'all .3s',
      fontSize: 14,
      borderRadius: 10,
      color: colors.white,
      padding: '0.1px 10px',
      marginTop: 5,
      cursor: 'pointer',
    };
  },
  title: {},
  date: {
    marginTop: -5,
    fontSize: 12,
  },
});
