import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';
import ServiceResultFactory from '../common/requests/serviceResultFactory';

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

const getRefreshedToken = () => {
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
