import axios from 'axios';
import { HttpMethod } from './types';

const restApiCall = async (url: string, method: HttpMethod, body?: object) => {
  return axios(url, { method, data: body });
};

const Requests = {
  restApiCall,
};

export default Requests;
