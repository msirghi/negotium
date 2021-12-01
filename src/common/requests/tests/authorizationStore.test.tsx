import authorizationStore from '../authorizationStore';

describe('authorizationStore', () => {
  beforeEach(() => {
    authorizationStore.setAuthToken('jwt');
  });

  it('should set the token', () => {
    authorizationStore.setAuthToken('token');
    expect(authorizationStore.getAuthToken()).toEqual('token');
  });

  it('should get the token', () => {
    expect(authorizationStore.getAuthToken()).toEqual('jwt');
  });
});
