import { mount } from 'enzyme';
import { AuthContainer } from './AuthContainer';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import AccountService from '../../../services/AccountService';
import { LoginForm } from '../form/LoginForm';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'registration',
    query: {
      ac: '123',
    },
  }),
}));

describe('AuthContainer with account activation', () => {
  beforeEach(() => {
    AccountService.activeAccount = jest.fn(() => Promise.resolve()) as any;
  });

  it('should make a call to activate the account if account code is in the url', async () => {
    await mount(
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    expect(AccountService.activeAccount).toBeCalled();
  });

  it('should make a call to activate the account and handle the error', async () => {
    AccountService.activeAccount = jest.fn(() => Promise.reject()) as any;
    const wrapper = await mount(
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    wrapper.update();
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});
