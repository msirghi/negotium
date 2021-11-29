import { Button, Fade, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { If } from '../../common/utilities/if/If';
import colors from '../../../common/styles/colors';
import AuthService from '../../../services/AuthService';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
  error: {
    marginTop: 20,
    color: colors.error.main,
    textAlign: 'center',
  },
});

export const LoginForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await AuthService.login(email, password);
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

  return (
    <div>
      <If condition={!!error}>
        <Fade in>
          <div className={classes.error}>{error}</div>
        </Fade>
      </If>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: 30 }}
        size={'small'}
        fullWidth
        label={'Email'}
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 30 }}
        size={'small'}
        fullWidth
        type={'password'}
        label={'Password'}
      />
      <Box className={classes.buttonContainer}>
        <LoadingButton
          disabled={!email || !password}
          loading={loading}
          onClick={onSubmit}
          color={'primary'}
          variant={'contained'}
          fullWidth
        >
          Sign in
        </LoadingButton>
      </Box>
    </div>
  );
};
