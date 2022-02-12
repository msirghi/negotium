import { FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import { useEmailChangeStyles } from '../email/styles';
import { LoadingButton } from '@mui/lab';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';
import { Box } from '@mui/system';
import ValidationService from '../../../../../../../services/ValidationService';
import { PASSWORD_STRENGTH_STATUS } from '../../../../../../../common/constants/enums';
import AccountService from '../../../../../../../services/AccountService';
import { useSnackbar } from 'notistack';
import { SNACKBAR_POSITIONS } from '../../../../../../../common/constants/constants';

type Props = {
  onBackClick: () => void;
};

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const PasswordChange: FC<Props> = ({ onBackClick }) => {
  const { t } = useTranslation('settings');
  const additionalClasses = useEmailChangeStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useIsMobile();

  const doPasswordsMatch = (newPassword: string, confirmPassword: string) => {
    return newPassword === confirmPassword;
  };

  const onSubmit = async (values: FormValues) => {
    const { confirmNewPassword, newPassword, oldPassword } = values;
    if (ValidationService.getPasswordStrength(newPassword) === PASSWORD_STRENGTH_STATUS.WEAK) {
      formik.setErrors({ newPassword: t('change.passwordTooWeak') });
      return;
    }
    if (!doPasswordsMatch(newPassword, confirmNewPassword)) {
      formik.setErrors({ confirmNewPassword: t('change.passwordMismatch') });
      return;
    }

    setLoading(true);
    try {
      const apiResult = await AccountService.updateUserPassword(oldPassword, newPassword);
      if (apiResult.status === 204) {
        enqueueSnackbar('Password updated', { variant: 'info' });
      }
    } catch (e) {
      enqueueSnackbar('Old password is wrong.', { variant: 'error' });
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit,
  });

  return (
    <div>
      <Button startIcon={<ChevronLeftIcon />} onClick={onBackClick}>
        {t('change.back')}
      </Button>

      <Box className={additionalClasses.titleContainer}>
        <p className={additionalClasses.title}>{t('change.passwordChangeTitle')}</p>
      </Box>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            className={additionalClasses.input}
            name="oldPassword"
            size="small"
            type="password"
            label={t('change.oldPassword')}
            inputProps={{ 'data-testid': 'old-password-field' }}
            fullWidth={isMobile}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />

          <TextField
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className={additionalClasses.input}
            name="newPassword"
            size="small"
            type="password"
            label={t('change.newPassword')}
            inputProps={{ 'data-testid': 'new-password-field' }}
            fullWidth={isMobile}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />

          <TextField
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            className={additionalClasses.input}
            fullWidth={isMobile}
            name="confirmNewPassword"
            size="small"
            type="password"
            label={t('change.confirmPassword')}
            inputProps={{ 'data-testid': 'confirm-password-field' }}
            error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
          />

          <div>
            <LoadingButton
              data-testid="submit-btn"
              disabled={!formik.values.oldPassword || !formik.values.newPassword}
              loading={loading}
              fullWidth={isMobile}
              type="submit"
              variant="contained"
              className={additionalClasses.saveButton}
            >
              {t('change.save')}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
