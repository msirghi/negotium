import { makeStyles } from '@mui/styles';

export const useHeroSectionStyles = makeStyles({
  image: {
    width: '45%',
    height: '45%',
    ['@media (max-width:992px)']: {
      width: '50%',
      height: '50%',
    },
    ['@media (max-width:768px)']: {
      width: '80%',
      height: '80%',
    },
  },
  landingSection: {
    padding: '100px 10vw',
    alignItems: 'flex-start',
    ['@media (max-width:768px)']: {
      padding: '100px 4vw !important',
    },
  },
  container: {
    flexDirection: 'column'
  },
  subtitle: {
    fontSize: 21
  },
  textContent: {
    fontSize: 30,
    width: '50%',
    ['@media (max-width:768px)']: {
      width: '100%',
      textAlign: 'center',
    },
  },
});
