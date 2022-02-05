import { makeStyles } from '@mui/styles';

export const useTaskItemStyles = makeStyles({
  container: {
    paddingBottom: 5,
    '&:hover': {
      cursor: 'pointer',
      background: '#f6f6f6 !important',
      borderRadius: 8,
      transition: '.2s background-color ease-in-out',
    },
  },
  date: {
    marginLeft: 40,
    fontWeight: 600,
    fontSize: 12,
    marginTop: -5,
  },
});
