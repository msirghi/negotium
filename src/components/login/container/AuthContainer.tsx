import { LoginForm } from '../form/LoginForm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Row } from '../../common/utilities/row/Row';
import { LoginFooter } from '../footer/LoginFooter';
import { FC, ReactNode } from 'react';
import { useAuthContainerStyles } from './styles';

type Props = {
  footer?: () => ReactNode;
};

export const AuthContainer: FC<Props> = ({ children, footer }) => {
  const classes = useAuthContainerStyles();

  return (
    <div className={classes.container}>
      <div className={classes.contentCard}>
        <div className={classes.title}>Welcome</div>
        <Row fullWidth alignHorizontalCenter className={classes.iconContainer}>
          <AcUnitIcon className={classes.icon} color={'primary'} />
        </Row>
        <div className={classes.loginForm}>{children || <LoginForm />}</div>
        <div className={classes.loginFooter}>
          {footer ? footer() : <LoginFooter />}
        </div>
      </div>
    </div>
  );
};
