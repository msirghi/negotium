import { BASE_API_URL_V1 } from '../constants/constants';
import { GetProjectResponse } from './types';
import ServiceResultFactory from './serviceResultFactory';
import Requests from './request';
import { HttpMethod } from '../constants/enums';

async function fetchProjects() {
  const { data } = await Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/projects`,
    HttpMethod.GET
  );
  return ServiceResultFactory.convertMongoIdToJSId(
    data as GetProjectResponse['projects']
  );
}

export const projectsRequests = {
  fetchProjects,
};
