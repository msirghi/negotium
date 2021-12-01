import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useFormik } from 'formik';
import ValidationService from '../../../services/ValidationService';
import { useSnackbar } from 'notistack';
import AuthService from '../../../services/AuthService';
import colors from '../../../common/styles/colors';
import { useRouter } from 'next/router';
import RegistrationFormUtils from './utils';

const useStyles = makeStyles({
  buttonContainer: {
    marginTop: 30,
  },
  error: {
    marginTop: 15,
    color: colors.error.main,
    textAlign: 'center',
  },
});

type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegistrationForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');
  const router = useRouter();

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
      await router.push('/login');
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
      errors.email = 'Invalid email.';
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = 'Passwords do not match.';
    }
    formik.setErrors(errors);
    return errors;
  };

  const passConfig = RegistrationFormUtils.getPasswordConfig(
    formik.values.password
  );

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
          label={'Name'}
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
          name={'email'}
          fullWidth
          label={'Email'}
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
          label={'Password'}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            passConfig && (
              <div style={{ color: passConfig.color }}>{passConfig.title}</div>
            )
          }
        />

        <TextField
          inputProps={{ 'data-testid': 'repeat-password-field' }}
          required
          name={'repeatPassword'}
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
          type={'password'}
          style={{ marginTop: 30 }}
          size={'small'}
          fullWidth
          label={'Repeat password'}
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
            Sign in
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
