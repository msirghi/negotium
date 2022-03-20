import { makeStyles } from '@mui/styles';

export const useHeroSectionStyles = makeStyles({
  image: {
    width: '40%',
    height: '40%',
    ['@media (max-width:768px)']: {
      width: '80%',
      height: '80%',
    },
  },
  landingSection: {
    padding: '100px 10vw',
    alignItems: 'flex-start',
    ['@media (max-width:768px)']: {
      padding: '100px 3vw !important',
    },
  },
  container: {
    flexDirection: 'column',
  },
  textContent: {
    width: '50%',
    ['@media (max-width:768px)']: {
      width: '100%',
      textAlign: 'center',
    },
  },
});
