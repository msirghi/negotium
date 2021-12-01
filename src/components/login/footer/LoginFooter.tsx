import { useRouter } from 'next/router';
import { useFooterStyles } from './styles';

export const LoginFooter = () => {
  const classes = useFooterStyles();
  const router = useRouter();

  const onSignUpClick = () => {
    router.push('/registration');
  };

  return (
    <div className={classes.container}>
      Don’t have an account?{' '}
      <span className={classes.link} onClick={onSignUpClick}>
        Sign Up
      </span>
    </div>
  );
};
