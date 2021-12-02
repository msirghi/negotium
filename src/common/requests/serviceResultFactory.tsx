import { AxiosError, AxiosResponse } from 'axios';

const fromResponse = (res: AxiosResponse) => {
  const { data, status, headers } = res;
  return {
    data,
    status,
    headers,
  };
};

const convertMongoIdToJSId = <T extends { id: string; _id: string }>(
  data: T[]
) => {
  if (!Array.isArray(data)) {
    return data;
  }
  if (!data) {
    return [];
  }
  return data.map((obj) => {
    obj.id = obj._id;
    return obj;
  });
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
  convertMongoIdToJSId,
};

export default ServiceResultFactory;
