import AccountService from '../../../../services/AccountService';
import { renderHook } from '@testing-library/react-hooks';
import { usePasswordUpdate } from '../usePasswordUpdate';
import { SnackbarProvider } from 'notistack';

describe('usePasswordUpdate', () => {
  beforeEach(() => {
    jest.spyOn(AccountService, 'updateUserPassword').mockImplementation(() => Promise.resolve({ status: 204 } as any));
  });

  afterEach(jest.clearAllMocks);

  const componentWithSnackbar = ({ children }: any) => <SnackbarProvider>{children}</SnackbarProvider>;

  it('should handle password update success', async () => {
    const { result } = renderHook(() => usePasswordUpdate(), { wrapper: componentWithSnackbar });
    const response = await result.current.updatePassword('old', 'new');
    expect(response).toBeTruthy();
  });

  it('should handle password update fail', async () => {
    jest.spyOn(AccountService, 'updateUserPassword').mockImplementation(() => Promise.reject({ status: 400 } as any));
    const { result } = renderHook(() => usePasswordUpdate(), { wrapper: componentWithSnackbar });
    const response = await result.current.updatePassword('old', 'new');
    expect(response).toBeFalsy();
  });
});
