import ValidationService from '../../../services/ValidationService';
import { PASSWORD_STRENGTH_STATUS } from '../../../common/constants/enums';
import { passwordStatusColors } from '../../../common/constants/constants';

const getPasswordConfig = (password: string | undefined) => {
  if (!password) {
    return null;
  }
  const passwordStrength = ValidationService.getPasswordStrength(password);
  if (passwordStrength === PASSWORD_STRENGTH_STATUS.TOO_WEAK) {
    return { title: 'Too weak', color: passwordStatusColors.tooWeak };
  }
  if (passwordStrength === PASSWORD_STRENGTH_STATUS.WEAK) {
    return { title: 'Weak', color: passwordStatusColors.weak };
  }
  if (passwordStrength === PASSWORD_STRENGTH_STATUS.MEDIUM) {
    return { title: 'Medium', color: passwordStatusColors.medium };
  }
  if (passwordStrength === PASSWORD_STRENGTH_STATUS.STRONG) {
    return { title: 'Strong', color: passwordStatusColors.strong };
  }
};

const RegistrationFormUtils = {
  getPasswordConfig,
};

export default RegistrationFormUtils;
