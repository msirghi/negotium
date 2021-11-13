import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Requests from '../request';
import { HttpMethod } from '../types';

describe('Requests', () => {
  const mock = new MockAdapter(axios);
  const url = 'https://httpbin.org/get';

  mock.onPost(url).reply(200, {
    data: {},
  });

  mock.onGet(url).reply(200, {
    data: {},
  });

  it('should make rest api call and return data', async () => {
    const result = await Requests.restApiCall(url, HttpMethod.POST);
    expect(result.data).toEqual({ data: {} });
  });
});
