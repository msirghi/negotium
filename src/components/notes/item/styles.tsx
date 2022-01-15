import { makeStyles } from '@mui/styles';

export const useNoteItemStyles = makeStyles({
  container: {
    cursor: 'pointer',
    height: '100%',
    boxShadow: '1px 3px 5px 1px rgba(34, 60, 80, 0.13);',
  },
  description: {
    fontSize: 14
  }
});
