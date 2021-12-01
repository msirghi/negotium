import ServiceResultFactory from '../../common/requests/serviceResultFactory';
import Requests from '../../common/requests/request';
import AuthService from '../AuthService';

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should handle success call', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCall = jest.fn(() => Promise.resolve({} as any));
      await AuthService.login('email', 'password');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed call', async () => {
      ServiceResultFactory.fromError = jest.fn() as any;
      Requests.restApiCall = jest.fn(() => Promise.reject({} as any));
      await AuthService.login('email', 'password');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('register', () => {
    it('should handle success call', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCall = jest.fn(() => Promise.resolve({} as any));
      await AuthService.register('email', 'password', 'name');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed call', async () => {
      ServiceResultFactory.fromError = jest.fn() as any;
      Requests.restApiCall = jest.fn(() => Promise.reject({} as any));
      await AuthService.register('email', 'password', 'name');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('getUserInfo', () => {
    it('should handle success call', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() =>
        Promise.resolve({} as any)
      );
      await AuthService.getUserInfo();
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed call', async () => {
      ServiceResultFactory.fromError = jest.fn() as any;
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject({} as any));
      await AuthService.getUserInfo();
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('getRefreshedToken', () => {
    it('should handle success call', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() =>
          Promise.resolve({} as any)
      );
      await AuthService.getRefreshedToken();
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle failed call', async () => {
      ServiceResultFactory.fromError = jest.fn() as any;
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject({} as any));
      await AuthService.getRefreshedToken();
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  })
});
