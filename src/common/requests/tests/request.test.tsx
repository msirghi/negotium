import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Requests from '../request';
import { HttpMethod } from '../types';
import authorizationStore from '../authorizationStore';

describe('Requests', () => {
  const mock = new MockAdapter(axios);
  const url = 'https://httpbin.org/get';

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('should make an api call with bearer token', async () => {
    authorizationStore.getAuthToken = jest.fn();
    const result = await Requests.restApiCallWithBearer(
      url,
      HttpMethod.POST,
      {}
    );
    expect(result.data).toEqual({ data: {} });
    expect(authorizationStore.getAuthToken).toBeCalled();
  });

  it('should make api call with headers', async () => {
    const result = await Requests.restApiCallWithHeaders(url, HttpMethod.POST, {
      test: 'test',
    });
    expect(result.data).toEqual({ data: {} });
  });
});
