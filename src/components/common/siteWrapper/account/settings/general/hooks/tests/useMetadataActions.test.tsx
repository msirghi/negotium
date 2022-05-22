import mockRouter from 'next-router-mock';
import { FC } from 'react';
import { MockReduxProvider } from '../../../../../../../../common/tests/TestUtils';
import { renderHook } from '@testing-library/react-hooks';
import { useMetadataActions } from '../useMetadataActions';
import { DefaultHomePage } from '../../../../../../../../common/constants/enums';
import Routes from '../../../../../../../../common/config/routes';
import AccountService from '../../../../../../../../services/AccountService';

mockRouter.push = jest.fn();

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('useMetadataActions', () => {
  const reduxState = {
    account: { metadata: {} },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper: FC = ({ children }) => <MockReduxProvider reduxStore={reduxState}>{children}</MockReduxProvider>;

  describe('routeToHomePage', () => {
    it.each([
      { route: Routes.inbox, name: DefaultHomePage.INBOX },
      { route: Routes.today, name: DefaultHomePage.TODAY },
      { route: Routes.timeline, name: DefaultHomePage.TIMELINE },
    ])(`should redirect to %p`, async (path) => {
      const { result } = renderHook(() => useMetadataActions(), { wrapper });
      await result.current.routeToHomePage(path.name, 'en');
      expect(mockRouter.push).toBeCalledWith(path.route, path.route, { locale: 'en' });
    });

    it('should not call route if invalid one is provided', async () => {
      const { result } = renderHook(() => useMetadataActions(), { wrapper });
      await result.current.routeToHomePage('test', 'en');
      expect(mockRouter.push).not.toBeCalled();
    });
  });

  describe('updateDefaultHomeView', () => {
    it('should make an api call to update home view', async () => {
      jest.spyOn(AccountService, 'updateUserHomeView').mockReturnValue(Promise.resolve() as any);
      const { result } = renderHook(() => useMetadataActions(), { wrapper });
      await result.current.updateDefaultHomeView(DefaultHomePage.TIMELINE);
      expect(AccountService.updateUserHomeView).toBeCalled();
    });

    it('should log the error if something went wrong', async () => {
      jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(AccountService, 'updateUserHomeView').mockReturnValue(Promise.reject() as any);
      const { result } = renderHook(() => useMetadataActions(), { wrapper });
      await result.current.updateDefaultHomeView(DefaultHomePage.TIMELINE);
      expect(console.error).toBeCalled();
    });
  });
});
