import axios from 'axios';
import { BASE_API_URL, BASE_API_URL_V1 } from '../constants/constants';
import {
  HttpMethod,
  IGetTasksResponse,
  IGetTasksWithSectionResponse,
} from './types';
import Requests from './request';
import ServiceResultFactory from './serviceResultFactory';
import { TasksMock } from '../tests/mockData/tasks-mock';
import {ISection} from "../types/tasks.types";

async function fetchTasks() {
  const { data } = await Requests.restApiCallWithBearer(
    `${BASE_API_URL_V1}/tasks`,
    HttpMethod.GET
  );
  return ServiceResultFactory.convertMongoIdToJSId(
    data as IGetTasksResponse['tasks']
  );
}

async function fetchTasksGroupedBySection() {
  // const { data } = await axios.get(`${BASE_API_URL}/tasks?groupBy=section`);
  const { data } = await axios.get(`${BASE_API_URL}/tasksWithSections`);
  return data as IGetTasksWithSectionResponse['data'];
}

async function fetchTasksByProject(projectId: string) {
  const { data } = await axios.get(
    `${BASE_API_URL_V1}/projects/${projectId}/tasks`
  );
  return ServiceResultFactory.convertMongoIdToJSId(
    data as IGetTasksResponse['tasks']
  );
}

async function fetchProjectSection(projectId: string) {
  const { data } = await axios.get(
    `${BASE_API_URL_V1}/projects/${projectId}/sections`
  );
  return ServiceResultFactory.convertMongoIdToJSId(data as ISection[]);
}

export const tasksRequests = {
  fetchTasks,
  fetchTasksGroupedBySection,
  fetchTasksByProject,
  fetchProjectSections: fetchProjectSection,
};
