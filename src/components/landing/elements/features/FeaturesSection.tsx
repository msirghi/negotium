import { Curve } from '../curve/Curve';
import { LandingSection } from '../section/LandingSection';
import { FeatureWrapper } from './wrapper/FeatureWrapper';
import { makeStyles } from '@mui/styles';

const useFeaturesSectionStyles = makeStyles({
  container: {
    padding: '100px 10vw',
    ['@media (max-width:768px)']: {
      padding: '100px 3vw !important',
    },
  },
});

export const FeaturesSection = () => {
  const classes = useFeaturesSectionStyles();

  return (
    <LandingSection backgroundColor={'#fafafa'} textColor={'black'} className={classes.container}>
      {/*<h1>Features</h1>*/}
      {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, reprehenderit?</p>*/}
      <FeatureWrapper
        title={'Lorem ipsum.'}
        subtitle={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, et!'}
        image={'/static/feature1.jpg'}
      />

      <FeatureWrapper
        title={'Lorem ipsum.'}
        subtitle={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, et!'}
        image={'/static/feature2.jpg'}
        revert
      />

      <FeatureWrapper
        title={'Lorem ipsum.'}
        subtitle={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, et!'}
        image={'/static/feature1.jpg'}
      />
      <Curve fill={'white'} />
    </LandingSection>
  );
};
