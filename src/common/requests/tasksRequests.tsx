import axios from 'axios';
import { BASE_API_URL, BASE_API_URL_V1 } from '../constants/constants';
import { GetTasksResponse, GetTasksWithSectionResponse } from './types';
import Requests from './request';
import ServiceResultFactory from './serviceResultFactory';
import { Section } from '../types/tasks.types';
import { HttpMethod } from '../constants/enums';

async function fetchTasks() {
  const { data } = await Requests.restApiCallWithBearer(`${BASE_API_URL_V1}/tasks`, HttpMethod.GET);
  return ServiceResultFactory.convertMongoIdToJSId(data as GetTasksResponse['tasks']);
}

async function fetchTasksGroupedBySection() {
  // const { data } = await axios.get(`${BASE_API_URL}/tasks?groupBy=section`);
  const { data } = await axios.get(`${BASE_API_URL}/tasksWithSections`);
  return data as GetTasksWithSectionResponse['data'];
}

async function fetchTasksByProject(projectId: string) {
  const { data } = await axios.get(`${BASE_API_URL_V1}/projects/${projectId}/tasks`);
  return ServiceResultFactory.convertMongoIdToJSId(data as GetTasksResponse['tasks']);
}

async function fetchProjectSection(projectId: string) {
  const { data } = await axios.get(`${BASE_API_URL_V1}/projects/${projectId}/sections`);
  return ServiceResultFactory.convertMongoIdToJSId(data as Section[]);
}

export const tasksRequests = {
  fetchTasks,
  fetchTasksGroupedBySection,
  fetchTasksByProject,
  fetchProjectSections: fetchProjectSection,
};
