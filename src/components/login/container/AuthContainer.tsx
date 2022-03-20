import { LoginForm } from '../form/LoginForm';
import { FC, ReactNode, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import AccountService from '../../../services/AccountService';
import { ACTIVATION_CODE_VAR_NAME } from '../../../common/constants/constants';
import { useSnackbar } from 'notistack';
import { FullscreenLoader } from '../../common/spinners/fullscreen/FullscreenLoader';
import SideContainer from './wrapper/SideContainer';

type Props = {
  footer?: () => ReactNode;
};

export const AuthContainer: FC<Props> = ({ children, footer }) => {
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
    <div>
      <SideContainer title={t('common.welcome')} renderFooter={footer}>
        {children || <LoginForm />}
      </SideContainer>
    </div>
  );
};
