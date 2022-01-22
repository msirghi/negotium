import axios, { AxiosRequestHeaders } from 'axios';
import authorizationStore from './authorizationStore';
import { HttpMethod } from '../constants/enums';

const restApiCall = async (url: string, method: HttpMethod, body?: object) => {
  return axios(url, { method, data: body });
};

const restApiCallWithBearer = (
  url: string,
  method: HttpMethod,
  body?: object
) => {
  const bearer = `Bearer ${authorizationStore.getAuthToken()}`;
  return axios(url, {
    method,
    data: body,
    headers: {
      Authorization: bearer,
    },
  });
};

const restApiCallWithHeaders = (
  url: string,
  method: HttpMethod,
  headers: AxiosRequestHeaders,
  body?: object
) => {
  return axios(url, {
    method,
    data: body,
    headers,
  });
};

const Requests = {
  restApiCall,
  restApiCallWithBearer,
  restApiCallWithHeaders,
};

export default Requests;
