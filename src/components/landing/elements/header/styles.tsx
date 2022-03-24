import { makeStyles } from '@mui/styles';

export const useLandingHeaderStyles = makeStyles({
  appBar: {
    backgroundColor: '#fff',
    color: 'black',
    padding: '0 8%',
  },
  logoText: {
    marginLeft: '1rem',
  },
  logoContainer: {
    cursor: 'pointer',
    transition: 'all .5s',
    '&:hover': {
      '-webkit-filter': 'grayscale(100%)',
      filter: 'grayscale(100%)',
    },
  },
});
