import { makeStyles } from '@mui/styles';

export const useNoteDialogStyles = makeStyles({
  container: {
    height: '50vh',
  },
  descriptionContainer: {},
  closeIcon: {
    position: 'absolute',
    right: 25,
    top: 25
  },
  titleContainer: {
    position: 'relative',
  },
});
