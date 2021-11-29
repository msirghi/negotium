import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';

const login = (email: string, password: string) => {
  return Requests.restApiCall(`${BASE_API_URL_V1}/login`, HttpMethod.POST, {
    email,
    password,
  });
};

const AuthService = {
  login,
};

export default AuthService;
