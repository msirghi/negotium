import { LandingSection } from '../section/LandingSection';
import { Row } from '../../../common/utilities/row/Row';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { RowDirection } from '../../../../common/constants/enums';
import useTranslation from 'next-translate/useTranslation';
import { useHeroSectionStyles } from './styles';

export const HeroSection = () => {
  const classes = useHeroSectionStyles();
  const isMobile = useIsMobile();
  const { t } = useTranslation('landing');

  return (
    <LandingSection
      curveColor={'whitesmoke'}
      className={classes.landingSection}
      backgroundColor={'white'}
      textColor={'black'}
      disableAnimation
    >
      <Row alignVerticalCenter fullWidth direction={isMobile ? RowDirection.COLUMN : RowDirection.ROW}>
        <div className={classes.textContent}>
          <h1>{t('titles.hero')}</h1>
          <p>{t('subtitles.hero')}</p>
        </div>
        <img className={classes.image} src={'/static/landing-hero.png'} />
      </Row>
    </LandingSection>
  );
};
