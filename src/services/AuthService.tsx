import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import ServiceResultFactory from '../common/requests/serviceResultFactory';
import { LoginResponse } from '../common/constants/types';
import { HttpMethod } from '../common/constants/enums';

const login = (email: string, password: string) => {
  return Requests.restApiCall(
    `${BASE_API_URL_V1}/auth/login`,
    HttpMethod.POST,
    {
      email,
      password,
    }
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const register = (email: string, password: string, name: string) => {
  return Requests.restApiCall(`${BASE_API_URL_V1}/users`, HttpMethod.POST, {
    email,
    password,
    name,
  })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const getUserInfo = () => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/users/me`,
    HttpMethod.GET
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const getRefreshedToken = (): Promise<LoginResponse> => {
  const body = {
    refresh_token: localStorage.getItem('rt'),
  };
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/auth/refresh-token`,
    HttpMethod.POST,
    body
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const AuthService = {
  login,
  register,
  getUserInfo,
  getRefreshedToken,
};

export default AuthService;
