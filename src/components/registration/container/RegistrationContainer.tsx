import { AuthContainer } from '../../login';
import { RegistrationForm } from '../form/RegistrationForm';
import { useRouter } from 'next/router';
import { useRegistrationContainerStyles } from './styles';

export const RegistrationContainer = () => {
  const classes = useRegistrationContainerStyles();
  const router = useRouter();

  const onSignInClick = () => {
    router.push('/login');
  };

  const renderFooter = () => {
    return (
      <div className={classes.container}>
        Have an account?{' '}
        <span
          id={'sign-in-link'}
          className={classes.link}
          onClick={onSignInClick}
        >
          Sign In
        </span>
      </div>
    );
  };

  return (
    <AuthContainer footer={renderFooter}>
      <RegistrationForm />
    </AuthContainer>
  );
};
