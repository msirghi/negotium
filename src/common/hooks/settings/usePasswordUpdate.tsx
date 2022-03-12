import { useSnackbar } from 'notistack';
import AccountService from '../../../services/AccountService';
import useTranslation from 'next-translate/useTranslation';

export const usePasswordUpdate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('settings');

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await AccountService.updateUserPassword(oldPassword, newPassword);
      enqueueSnackbar(t('snackbarTitles.passwordUpdated'), { variant: 'info' });
    } catch (e) {
      enqueueSnackbar(t('snackbarTitles.wrongOldPassword'), { variant: 'error' });
      return false;
    }
    return true;
  };

  return { updatePassword };
};
