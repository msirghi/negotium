import { AuthContainer } from '../../login';
import { RegistrationForm } from '../form/RegistrationForm';
import { RegistrationFooter } from './footer/RegistrationFooter';

export const RegistrationContainer = () => {
  return (
    <AuthContainer footer={RegistrationFooter}>
      <RegistrationForm />
    </AuthContainer>
  );
};
