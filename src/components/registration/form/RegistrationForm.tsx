import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useFormik } from 'formik';
import ValidationService from '../../../services/ValidationService';
import { useSnackbar } from 'notistack';
import AuthService from '../../../services/AuthService';
import { useRouter } from 'next/router';
import RegistrationFormUtils from './utils';
import useTranslation from 'next-translate/useTranslation';
import { useRegistrationFormStyles } from './styles';
import Routes from '../../../common/config/routes';

type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegistrationForm = () => {
  const classes = useRegistrationFormStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useTranslation('auth');

  const onSubmit = async (values: FormValues) => {
    const errors = validateFields(values);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      setLoading(true);
      const { email, password, name } = values;
      await AuthService.register(email, password, name);
      setLoading(false);
      enqueueSnackbar('Registration completed.', {
        variant: 'success',
      });
      await router.push(Routes.login);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
      email: '',
    },
    onSubmit,
  });

  const validateFields = (values: FormValues) => {
    const { email, password, repeatPassword } = values;
    const errors: Partial<FormValues> = {};
    if (!ValidationService.isEmailValid(email)) {
      errors.email = t('errors.invalidEmail');
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = t('errors.passwordsMismatch');
    }
    formik.setErrors(errors);
    return errors;
  };

  const passConfig = RegistrationFormUtils.getPasswordConfig(formik.values.password);

  return (
    <form onSubmit={formik.handleSubmit}>
      {error && <div className={classes.error}>{error}</div>}
      <div>
        <TextField
          required
          inputProps={{ 'data-testid': 'name-field' }}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          style={{ marginTop: 30 }}
          size={'small'}
          fullWidth
          name={'name'}
          autoComplete={'on'}
          label={t('common.name')}
        />

        <TextField
          inputProps={{ 'data-testid': 'email-field' }}
          required
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          style={{ marginTop: 30 }}
          size={'small'}
          autoComplete={'on'}
          name={'email'}
          fullWidth
          label={t('common.email')}
        />

        <TextField
          inputProps={{ 'data-testid': 'password-field' }}
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          style={{ marginTop: 30 }}
          type={'password'}
          size={'small'}
          name={'password'}
          fullWidth
          label={t('common.password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={passConfig && <div style={{ color: passConfig.color }}>{passConfig.title}</div>}
        />

        <TextField
          inputProps={{ 'data-testid': 'repeat-password-field' }}
          required
          name={'repeatPassword'}
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
          helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
          type={'password'}
          style={{ marginTop: 30 }}
          size={'small'}
          fullWidth
          label={t('common.repeatPassword')}
        />
        <div className={classes.buttonContainer}>
          <LoadingButton
            data-testid={'submit-button'}
            disabled={!formik.isValid}
            loading={loading}
            type={'submit'}
            color={'primary'}
            variant={'contained'}
            fullWidth
          >
            {t('registration.signIn')}
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
