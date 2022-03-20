import { Curve } from '../curve/Curve';
import { LandingSection } from '../section/LandingSection';
import { FeatureWrapper } from './wrapper/FeatureWrapper';
import { makeStyles } from '@mui/styles';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation('landing');

  return (
    <LandingSection backgroundColor={'aliceblue'} textColor={'black'} className={classes.container}>
      <FeatureWrapper title={t('titles.feature_1')} subtitle={t('subtitles.feature_1')} image={'/static/feature1.jpg'} />

      <FeatureWrapper title={t('titles.feature_2')} subtitle={t('subtitles.feature_2')} image={'/static/feature2.jpg'} revert />

      <FeatureWrapper title={t('titles.feature_3')} subtitle={t('subtitles.feature_3')} image={'/static/feature1.jpg'} />
      <Curve fill={'white'} />
    </LandingSection>
  );
};
