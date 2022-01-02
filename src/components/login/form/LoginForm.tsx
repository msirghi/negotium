import { Fade, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { FormEvent, useState } from 'react';
import { If } from '../../common/utilities/if/If';
import AuthService from '../../../services/AuthService';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAccountInfo } from '../../../redux/account/accountSlice';
import authorizationStore from '../../../common/requests/authorizationStore';
import { useLoginFormStyles } from './styles';
import Routes from '../../../common/config/routes';
import { useTranslation } from 'next-i18next';
import { TextInputChangeEvent } from '../../../common/constants/types';

export const LoginForm = () => {
  const classes = useLoginFormStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('auth');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loginResponse = await AuthService.login(email, password);
      const { data } = loginResponse;
      localStorage.setItem('rt', data.refresh_token);
      authorizationStore.setAuthToken(data.access_token);
      const accountResponse = await AuthService.getUserInfo();
      dispatch(setAccountInfo(accountResponse.data));
      await router.push(Routes.inbox);
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

  const handleInputChange = (callback: Function) => {
    return (evt: TextInputChangeEvent) => callback(evt.target.value);
  };

  const handleEmailChange = () => handleInputChange(setEmail);

  const handlePasswordChange = () => handleInputChange(setPassword);

  return (
    <form onSubmit={onSubmit}>
      <If condition={!!error}>
        <Fade in>
          <div data-testid={'login-error'} className={classes.error}>
            {error}
          </div>
        </Fade>
      </If>
      <TextField
        autoComplete={'on'}
        value={email}
        inputProps={{ 'data-testid': 'email-input' }}
        onChange={handleEmailChange()}
        style={{ marginTop: 30 }}
        size={'small'}
        fullWidth
        label={t('common.email')}
      />
      <TextField
        value={password}
        autoComplete={'on'}
        inputProps={{ 'data-testid': 'password-input' }}
        onChange={handlePasswordChange()}
        style={{ marginTop: 30 }}
        size={'small'}
        fullWidth
        type={'password'}
        label={t('common.password')}
      />
      <Box className={classes.buttonContainer}>
        <LoadingButton
          data-testid={'submit-button'}
          disabled={!email || !password}
          loading={loading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          fullWidth
        >
          {t('registration.signIn')}
        </LoadingButton>
      </Box>
    </form>
  );
};
