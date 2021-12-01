import ValidationService from '../ValidationService';

describe('ValidationService', () => {
  describe('isEmailValid', () => {
    it('should return true on valid email', () => {
      expect(ValidationService.isEmailValid('email@email.com')).toBeTruthy();
    });

    it('should return false on invalid email [1]', () => {
      expect(ValidationService.isEmailValid('email')).toBeFalsy();
    });

    it('should return false on invalid email [2]', () => {
      expect(ValidationService.isEmailValid('@mail.com')).toBeFalsy();
    });

    it('should return false on invalid email [3]', () => {
      expect(ValidationService.isEmailValid('vc@mail')).toBeFalsy();
    });
  });

  describe('getPasswordStrength', () => {
    it('should return Too Weak status', () => {
      expect(ValidationService.getPasswordStrength('asdfasdf')).toEqual(
        'Too weak'
      );
    });

    it('should return Weak status', () => {
      expect(ValidationService.getPasswordStrength('asdf1234')).toEqual('Weak');
    });

    it('should return Medium status', () => {
      expect(ValidationService.getPasswordStrength('Asd1234!')).toEqual(
        'Medium'
      );
    });

    it('should return Strong status', () => {
      expect(ValidationService.getPasswordStrength('A@2asdF2020!!*')).toEqual(
        'Strong'
      );
    });
  });
});
