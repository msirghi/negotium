import { passwordStrength } from 'check-password-strength'

const isEmailValid = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getPasswordStrength = (password: string) => {
  return passwordStrength(password).value;
}

const ValidationService = {
  isEmailValid,
  getPasswordStrength
};

export default ValidationService;
