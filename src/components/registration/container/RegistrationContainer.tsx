import { AuthContainer } from '../../login';
import { RegistrationForm } from '../form/RegistrationForm';
import { useRouter } from 'next/router';
import { useRegistrationContainerStyles } from './styles';
import Routes from '../../../common/config/routes';
import useTranslation from 'next-translate/useTranslation';

export const RegistrationContainer = () => {
  const classes = useRegistrationContainerStyles();
  const router = useRouter();
  const { t } = useTranslation('auth');

  const onSignInClick = () => {
    router.push(Routes.login);
  };

  const renderFooter = () => {
    return (
      <div className={classes.container}>
        {t('registration.haveAnAccount')}{' '}
        <span id={'sign-in-link'} className={classes.link} onClick={onSignInClick}>
          {t('registration.signIn')}
        </span>
      </div>
    );
  };

  return (
    <AuthContainer footer={renderFooter}>
      <RegistrationForm />
    </AuthContainer>
  );
};
