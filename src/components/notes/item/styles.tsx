import { makeStyles } from '@mui/styles';
import colors from '../../../common/styles/colors';

export const useNoteItemStyles = makeStyles({
  container: {
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    boxShadow: '1px 3px 5px 1px rgba(34, 60, 80, 0.13);',
  },
  description: {
    fontSize: 14,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    height: 40,
  },
  title: {
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  cardActions: {},
  deleteButton: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    opacity: 0,
    transition: 'opacity .2s ease-in',
    '&:hover': {
      opacity: 1,
    },
  },
  date: {
    fontSize: 11,
    marginLeft: 7,
    marginTop: -10,
    color: colors.greys['500'],
  }
});
