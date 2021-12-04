import Requests from '../common/requests/request';
import { BASE_API_URL_V1 } from '../common/constants/constants';
import { HttpMethod } from '../common/requests/types';
import ServiceResultFactory from '../common/requests/serviceResultFactory';

const getUserMetadata = () => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/metadata`,
    HttpMethod.GET
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const updateUserTheme = (theme: string) => {
  return Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/metadata`,
    HttpMethod.PATCH,
    { theme }
  )
    .then(ServiceResultFactory.fromResponse)
    .catch(ServiceResultFactory.fromError);
};

const AccountService = {
  getUserMetadata,
  updateUserTheme,
};

export default AccountService;
