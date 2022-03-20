import { makeStyles } from '@mui/styles';

export const useFeatureWrapperStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
    ['@media (max-width:992px)']: {
      flexDirection: 'column',
    },
  },
  image: {
    borderRadius: 15,
    ['@media (max-width:992px)']: {
      width: '40vw',
    },
    ['@media (max-width:768px)']: {
      width: '80vw',
    },
  },
  textWrapper: {
    width: '40%',
    ['@media (max-width:992px)']: {
      width: '80%',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
  },
});
