import { FC } from 'react';
import { MockReduxProvider } from '../../../../../../../../common/tests/TestUtils';
import mockRouter from 'next-router-mock';
import { renderHook } from '@testing-library/react-hooks';
import { useUpdateLanguage } from '../useUpdateLanguage';
import AccountService from '../../../../../../../../services/AccountService';

mockRouter.push = jest.fn();

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('useUpdateLanguage', () => {
  const reduxState = {
    account: { metadata: {} },
  };

  const wrapper: FC = ({ children }) => <MockReduxProvider reduxStore={reduxState}>{children}</MockReduxProvider>;

  it('should handle language update', async () => {
    jest.spyOn(AccountService, 'updateUserLanguage').mockImplementation();
    const { result } = renderHook(() => useUpdateLanguage(), { wrapper });
    await result.current.updateLanguage({ target: { value: '' } } as any);
    expect(AccountService.updateUserLanguage).toBeCalled();
    expect(mockRouter.push).toBeCalled();
  });
});
