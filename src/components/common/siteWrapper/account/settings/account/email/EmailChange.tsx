import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Row } from '../../../../../utilities/row/Row';
import { RowDirection } from '../../../../../../../common/constants/enums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/store';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';
import { useEmailChangeStyles } from './styles';
import { useFormik } from 'formik';
import ValidationService from '../../../../../../../services/ValidationService';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import AccountService from '../../../../../../../services/AccountService';
import { If } from '../../../../../utilities/if/If';
import { setUserEmail } from '../../../../../../../redux/account/accountSlice';

type Props = {
  onBackClick: () => void;
};

type FormValues = {
  newEmail: string;
  confirmNewEmail: string;
};

export const EmailChange: FC<Props> = ({ onBackClick }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isMobile = useIsMobile();
  const classes = useEmailChangeStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('settings');

  const email = useSelector((state: RootState) => state.account.info.email);
  const dispatch = useDispatch();

  const onSubmit = async (values: FormValues) => {
    setError('');
    const errors = validateFields(values);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setLoading(true);
    try {
      const lowercasedEmail = values.newEmail.toLowerCase().trim();
      await AccountService.updateUserEmail(lowercasedEmail);
      enqueueSnackbar(t('change.emailUpdated'), { variant: 'success' });
      dispatch(setUserEmail(lowercasedEmail));
      formik.resetForm();
    } catch (e) {
      setError((e as Error).message);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      newEmail: '',
      confirmNewEmail: '',
    },
    onSubmit,
  });

  const validateFields = (values: FormValues) => {
    const errors: { [key: string]: string } = {};
    const { newEmail, confirmNewEmail } = values;
    const isValidEmail = ValidationService.isEmailValid(newEmail);
    if (!isValidEmail) {
      errors.newEmail = t('change.invalidEmail');
    }
    if (newEmail.toLowerCase() !== confirmNewEmail.toLowerCase()) {
      errors.confirmNewEmail = t('change.emailMismatch');
    }
    formik.setErrors(errors);
    return errors;
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Button data-testid={'back-button'} startIcon={<ChevronLeftIcon />} onClick={onBackClick}>
          {t('change.back')}
        </Button>
      </Box>

      <Box className={classes.titleContainer}>
        <p className={classes.title}>{t('change.emailChangeTitle')}</p>
        <p className={classes.subtitle}>
          {t('change.currentEmail')}
          <b>{email}</b>
        </p>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <If condition={!!error}>
          <Box data-testid={'error-text'} className={classes.error}>
            {error}
          </Box>
        </If>
        <Row direction={RowDirection.COLUMN} className={classes.formContainer}>
          <TextField
            value={formik.values.newEmail}
            inputProps={{ 'data-testid': 'new-email-field' }}
            className={classes.input}
            onChange={formik.handleChange}
            name={'newEmail'}
            size={'small'}
            label={t('change.newEmail')}
            fullWidth={isMobile}
            error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
            helperText={formik.touched.newEmail && formik.errors.newEmail}
          />

          <TextField
            inputProps={{ 'data-testid': 'repeat-email-field' }}
            onChange={formik.handleChange}
            name={'confirmNewEmail'}
            value={formik.values.confirmNewEmail}
            fullWidth={isMobile}
            className={classes.input}
            size={'small'}
            label={t('change.confirmNewEmail')}
            error={
              formik.touched.confirmNewEmail &&
              Boolean(formik.errors.confirmNewEmail)
            }
            helperText={
              formik.touched.confirmNewEmail && formik.errors.confirmNewEmail
            }
          />
        </Row>

        <Row>
          <LoadingButton
            data-testid={'submit-button'}
            loading={loading}
            disabled={!formik.dirty}
            type={'submit'}
            fullWidth={isMobile}
            variant={'contained'}
            className={classes.saveButton}
            color={'primary'}
          >
            {t('change.save')}
          </LoadingButton>
        </Row>
      </form>
    </Box>
  );
};
