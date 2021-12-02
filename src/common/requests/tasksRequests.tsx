import axios from 'axios';
import { BASE_API_URL, BASE_API_URL_V1 } from '../constants/constants';
import {
  HttpMethod,
  IGetTasksResponse,
  IGetTasksWithSectionResponse,
} from './types';
import Requests from './request';
import ServiceResultFactory from "./serviceResultFactory";

async function fetchTasks() {
  const { data } = await Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks`,
    HttpMethod.GET
  );
  return ServiceResultFactory.convertMongoIdToJSId(data as IGetTasksResponse['tasks']);
}

async function fetchTasksGroupedBySection() {
  // const { data } = await axios.get(`${BASE_API_URL}/tasks?groupBy=section`);
  const { data } = await axios.get(`${BASE_API_URL}/tasksWithSections`);
  return data as IGetTasksWithSectionResponse['data'];
}

async function fetchTasksByProject(projectId: string) {
  const { data } = await axios.get(
    `${BASE_API_URL}/tasks?projectId=${projectId}`
  );
  return data as IGetTasksResponse['tasks'];
}

export const tasksRequests = {
  fetchTasks,
  fetchTasksGroupedBySection,
  fetchTasksByProject,
};
