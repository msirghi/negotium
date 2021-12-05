import { useRouter } from 'next/router';
import { useFooterStyles } from './styles';
import { useTranslation } from 'next-i18next';
import Routes from '../../../common/config/routes';

export const LoginFooter = () => {
  const classes = useFooterStyles();
  const router = useRouter();
  const { t } = useTranslation('auth');

  const onSignUpClick = () => {
    router.push(Routes.registration);
  };

  return (
    <div className={classes.container}>
      {t('login.dontHaveAnAccount')}{' '}
      <span className={classes.link} onClick={onSignUpClick}>
        {t('login.signUp')}
      </span>
    </div>
  );
};
