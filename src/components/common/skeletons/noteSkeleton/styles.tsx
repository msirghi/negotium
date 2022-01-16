import { makeStyles } from '@mui/styles';

export const useNoteSkeletonStyles = makeStyles({
  notesContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  noteSkeleton: {
    margin: 5,
    marginBottom: -40
  },
  inputSkeleton: {
    marginBottom: -20
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});
