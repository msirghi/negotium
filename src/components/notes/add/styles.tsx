import { makeStyles } from '@mui/styles';

export const useNotesAddInputStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputToggler: {
    width: '33%',
    borderColor: '#e0e0e0',
    border: '1px solid',
    borderRadius: 5,
    padding: 5,
    ['@media (max-width:1024px)']: {
      marginTop: '1rem',
      width: '50%',
    },
    ['@media (max-width:768px)']: {
      marginTop: '1rem',
      width: '100%',
    },
  },
  input: {
    width: '100%',
    marginLeft: 10,
  },
}));
