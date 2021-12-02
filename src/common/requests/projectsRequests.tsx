import { BASE_API_URL_V1 } from '../constants/constants';
import { HttpMethod, IGetProjectResponse } from './types';
import ServiceResultFactory from './serviceResultFactory';
import Requests from './request';

async function fetchProjects() {
  const { data } = await Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects`,
    HttpMethod.GET
  );
  return ServiceResultFactory.convertMongoIdToJSId(
    data as IGetProjectResponse['projects']
  );
}

export const projectsRequests = {
  fetchProjects,
};
