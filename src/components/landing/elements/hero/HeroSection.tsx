import { Curve } from '../curve/Curve';
import { LandingSection } from '../section/LandingSection';
import { Row } from '../../../common/utilities/row/Row';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { ROW_DIRECTION } from '../../../../common/constants/enums';
import useTranslation from 'next-translate/useTranslation';
import { useHeroSectionStyles } from './styles';

export const HeroSection = () => {
  const classes = useHeroSectionStyles();
  const isMobile = useIsMobile();
  const { t } = useTranslation('landing');

  return (
    <LandingSection className={classes.landingSection} backgroundColor={'white'} textColor={'black'}>
      <Row alignVerticalCenter fullWidth direction={isMobile ? ROW_DIRECTION.COLUMN : ROW_DIRECTION.ROW}>
        <div className={classes.textContent}>
          <h1>{t('titles.hero')}</h1>
          <p>{t('subtitles.hero')}</p>
        </div>
        <img className={classes.image} src={'/static/landing-hero.png'} />
      </Row>
      <Curve fill={'whitesmoke'} />
    </LandingSection>
  );
};
