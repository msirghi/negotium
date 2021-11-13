import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';
import { IGetTasksResponse, IGetTasksWithSectionResponse } from './types';

async function fetchTasks() {
  const { data } = await axios.get(`${BASE_API_URL}/tasks`);
  return data as IGetTasksResponse['tasks'];
}

async function fetchTasksGroupedBySection() {
  // const { data } = await axios.get(`${BASE_API_URL}/tasks?groupBy=section`);
  const { data } = await axios.get(`${BASE_API_URL}/tasksWithSections`);
  return data as IGetTasksWithSectionResponse['data'];
}

export const tasksRequests = {
  fetchTasks,
  fetchTasksGroupedBySection
};
