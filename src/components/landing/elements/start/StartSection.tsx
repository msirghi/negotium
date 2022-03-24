import { LandingSection } from '../section/LandingSection';
import { Curve } from '../curve/Curve';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Routes from '../../../../common/config/routes';

const useStartSectionStyles = makeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const StartSection = () => {
  const classes = useStartSectionStyles();
  const { t } = useTranslation('landing');
  const router = useRouter();

  const onClick = () => {
    router.push(Routes.registration);
  };

  return (
    <LandingSection backgroundColor={'white'} className={classes.container} textColor={'black'}>
      <div id="start-section" />
      <h1>{t('titles.start')}</h1>
      <Button variant={'contained'} color={'primary'} onClick={onClick}>
        {t('signUp')}
      </Button>
      <Curve fill={'white'} />
    </LandingSection>
  );
};
