import ValidationService from '../../../services/ValidationService';
import { PasswordStrengthStatus } from '../../../common/constants/enums';
import { passwordStatusColors } from '../../../common/constants/constants';

const getPasswordConfig = (password: string | undefined) => {
  if (!password) {
    return null;
  }
  const passwordStrength = ValidationService.getPasswordStrength(password);
  if (passwordStrength === PasswordStrengthStatus.TOO_WEAK) {
    return { title: 'Too weak', color: passwordStatusColors.tooWeak };
  }
  if (passwordStrength === PasswordStrengthStatus.WEAK) {
    return { title: 'Weak', color: passwordStatusColors.weak };
  }
  if (passwordStrength === PasswordStrengthStatus.MEDIUM) {
    return { title: 'Medium', color: passwordStatusColors.medium };
  }
  if (passwordStrength === PasswordStrengthStatus.STRONG) {
    return { title: 'Strong', color: passwordStatusColors.strong };
  }
};

const RegistrationFormUtils = {
  getPasswordConfig,
};

export default RegistrationFormUtils;
