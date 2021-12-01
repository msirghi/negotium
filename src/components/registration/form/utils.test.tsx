import RegistrationFormUtils from './utils';
import ValidationService from '../../../services/ValidationService';
import { passwordStatusColors } from '../../../common/constants/constants';

describe('RegistrationFormUtils', () => {
  describe('getPasswordConfig', () => {
    it('should return null if undefined value is provided', () => {
      expect(RegistrationFormUtils.getPasswordConfig(undefined)).toBeNull();
    });

    it('should return specific color for too weak status', () => {
      ValidationService.getPasswordStrength = jest.fn(() => 'Too weak');
      expect(RegistrationFormUtils.getPasswordConfig('pass')!.color).toEqual(
        passwordStatusColors.tooWeak
      );
    });

    it('should return specific color for weak status', () => {
      ValidationService.getPasswordStrength = jest.fn(() => 'Weak');
      expect(RegistrationFormUtils.getPasswordConfig('pass')!.color).toEqual(
        passwordStatusColors.weak
      );
    });

    it('should return specific color for medium status', () => {
      ValidationService.getPasswordStrength = jest.fn(() => 'Medium');
      expect(RegistrationFormUtils.getPasswordConfig('pass')!.color).toEqual(
        passwordStatusColors.medium
      );
    });

    it('should return specific color for strong status', () => {
      ValidationService.getPasswordStrength = jest.fn(() => 'Strong');
      expect(RegistrationFormUtils.getPasswordConfig('pass')!.color).toEqual(
        passwordStatusColors.strong
      );
    });
  });
});
