import { LoginForm } from '../form/LoginForm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Row } from '../../common/utilities/row/Row';
import { LoginFooter } from '../footer/LoginFooter';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useAuthContainerStyles } from './styles';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import AccountService from '../../../services/AccountService';
import { ACTIVATION_CODE_VAR_NAME } from '../../../common/constants/constants';
import { useSnackbar } from 'notistack';
import { FullscreenLoader } from '../../common/spinners/fullscreen/FullscreenLoader';

type Props = {
  footer?: () => ReactNode;
};

export const AuthContainer: FC<Props> = ({ children, footer }) => {
  const classes = useAuthContainerStyles();
  const { t } = useTranslation('auth');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const activateAccount = async () => {
    try {
      setLoading(true);
      const token = router.query[ACTIVATION_CODE_VAR_NAME] as unknown as string;
      await AccountService.activeAccount(token);
      enqueueSnackbar(t('common.accountActivated'), { variant: 'success' });
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.query[ACTIVATION_CODE_VAR_NAME]) {
      activateAccount();
    }
  }, []);

  if (loading) {
    return <FullscreenLoader />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.contentCard}>
        <div className={classes.title}>{t('common.welcome')}</div>
        <Row fullWidth alignHorizontalCenter className={classes.iconContainer}>
          <AcUnitIcon className={classes.icon} color={'primary'} />
        </Row>
        <div className={classes.loginForm}>{children || <LoginForm />}</div>
        <div className={classes.loginFooter}>
          {footer ? footer() : <LoginFooter />}
        </div>
      </div>
    </div>
  );
};
