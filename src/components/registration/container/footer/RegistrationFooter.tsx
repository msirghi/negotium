import { useRegistrationContainerStyles } from '../styles';
import Routes from '../../../../common/config/routes';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export const RegistrationFooter = () => {
  const classes = useRegistrationContainerStyles();
  const router = useRouter();
  const { t } = useTranslation('auth');

  const onSignInClick = () => {
    router.push(Routes.login);
  };

  return (
    <div className={classes.container}>
      {t('registration.haveAnAccount')}{' '}
      <span id={'sign-in-link'} className={classes.link} onClick={onSignInClick}>
        {t('registration.signIn')}
      </span>
    </div>
  );
};
