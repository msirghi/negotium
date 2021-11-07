import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';
import { IGetProjectResponse } from './types';

async function fetchProjects() {
  const { data } = await axios.get(`${BASE_API_URL}/projects`);
  return data as IGetProjectResponse;
}

export const projectsRequests = {
  fetchProjects,
};
