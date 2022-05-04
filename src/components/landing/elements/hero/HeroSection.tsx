import { LandingSection } from '../section/LandingSection';
import { Row } from '../../../common/utilities/row/Row';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { RowDirection } from '../../../../common/constants/enums';
import useTranslation from 'next-translate/useTranslation';
import { useHeroSectionStyles } from './styles';
import { Button } from '@mui/material';
import Routes from '../../../../common/config/routes';
import { useRouter } from 'next/router';

export const HeroSection = () => {
  const classes = useHeroSectionStyles();
  const isMobile = useIsMobile();
  const { t } = useTranslation('landing');
  const router = useRouter();

  const onClick = () => {
    router.push(Routes.registration);
  };

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
          <h2>{t('titles.hero')}</h2>
          <p className={classes.subtitle}>{t('subtitles.hero')}</p>
          <Button variant={'outlined'} color={'primary'} onClick={onClick}>
            {t('signUp')}
          </Button>
        </div>
        <img className={classes.image} src={'/static/landing-hero.png'} />
      </Row>
    </LandingSection>
  );
};
