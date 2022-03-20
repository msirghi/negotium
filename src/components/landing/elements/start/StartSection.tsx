import { LandingSection } from '../section/LandingSection';
import { Curve } from '../curve/Curve';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStartSectionStyles = makeStyles({
  container: {
    alignItems: 'center',
      justifyContent: 'center'
  },
});

export const StartSection = () => {
  const classes = useStartSectionStyles();

  return (
    <LandingSection backgroundColor={'white'} className={classes.container} textColor={'black'}>
      <h1>Ready to start?</h1>
      <Button variant={'contained'} color={'primary'}>
        Sign up to Negotium
      </Button>
      <Curve fill={'white'} />
    </LandingSection>
  );
};
