import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import ServiceResultFactory from '../common/requests/serviceResultFactory';
import { HttpMethod } from '../common/constants/enums';

const getUserMetadata = () => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/metadata`, HttpMethod.GET)
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateUserTheme = (theme: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/metadata`, HttpMethod.PATCH, { theme })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateUserLanguage = (language: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/metadata`, HttpMethod.PATCH, { language })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const activeAccount = (token: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/account-activation/${token}`, HttpMethod.POST)
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateUserName = (name: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/users/name`, HttpMethod.PATCH, { name })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateUserEmail = (email: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/users/email`, HttpMethod.PATCH, { email })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateUserPassword = (oldPassword: string, newPassword: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/users/password`, HttpMethod.PATCH, {
    newPassword,
    oldPassword,
  });
};

const updateUserHomeView = (defaultHomeView: string) => {
  return Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/metadata`, HttpMethod.PATCH, { defaultHomeView })
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const AccountService = {
  getUserMetadata,
  updateUserTheme,
  updateUserName,
  activeAccount,
  updateUserLanguage,
  updateUserEmail,
  updateUserPassword,
  updateUserHomeView
};

export default AccountService;
