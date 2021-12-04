import Requests from '../../common/requests/request';
import ServiceResultFactory from '../../common/requests/serviceResultFactory';
import AccountService from '../AccountService';

describe('AccountService', () => {
  describe('getUserMetadata', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await AccountService.getUserMetadata();
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle error response', async () => {
      ServiceResultFactory.fromError = jest.fn() as any;
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await AccountService.getUserMetadata();
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });

  describe('updateUserTheme', () => {
    it('should handle success response', async () => {
      ServiceResultFactory.fromResponse = jest.fn();
      Requests.restApiCallWithBearer = jest.fn(() => Promise.resolve()) as any;
      await AccountService.updateUserTheme('theme');
      expect(ServiceResultFactory.fromResponse).toBeCalled();
    });

    it('should handle error response', async () => {
      ServiceResultFactory.fromError = jest.fn() as any;
      Requests.restApiCallWithBearer = jest.fn(() => Promise.reject()) as any;
      await AccountService.updateUserTheme('theme');
      expect(ServiceResultFactory.fromError).toBeCalled();
    });
  });
});
