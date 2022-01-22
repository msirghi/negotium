import { makeStyles } from '@mui/styles';

export const useNotesAddFormStyles = makeStyles({
  container: {
    padding: 15,
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid lightgrey',
    borderRadius: 5,
    boxShadow: '1px 3px 5px 1px rgba(34, 60, 80, 0.13);',
    ['@media (max-width:1024px)']: {
      marginTop: '1rem',
      width: '50%',
    },
    ['@media (max-width:768px)']: {
      marginTop: '1rem',
      width: '100%',
    },
  },
  input: {},
  descriptionInput: {
    marginTop: '1rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 2,
  },
});
