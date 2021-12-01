import { AxiosError, AxiosResponse } from 'axios';

const fromResponse = (res: AxiosResponse) => {
  const { data, status, headers } = res;
  return {
    data,
    status,
    headers,
  };
};

const fromError = (res: AxiosError) => {
  if (res.response && res.response.data) {
    throw Error(res.response.data.message);
  }
  throw Error('Generic');
};

const ServiceResultFactory = {
  fromError,
  fromResponse,
};

export default ServiceResultFactory;
