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

export const LoginForm = () => {
  const classes = useLoginFormStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

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
      await router.push('/home/inbox');
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

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
        value={email}
        inputProps={{ 'data-testid': 'email-input' }}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: 30 }}
        size={'small'}
        fullWidth
        label={'Email'}
      />
      <TextField
        value={password}
        inputProps={{ 'data-testid': 'password-input' }}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 30 }}
        size={'small'}
        fullWidth
        type={'password'}
        label={'Password'}
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
          Sign in
        </LoadingButton>
      </Box>
    </form>
  );
};
