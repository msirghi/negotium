import { mount } from 'enzyme';
import { AuthContainer } from './AuthContainer';
import { LoginForm } from '../form/LoginForm';
import { LoginFooter } from '../footer/LoginFooter';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { ReactChildren, ReactNode } from 'react';
import authorizationStore from "../../../common/requests/authorizationStore";

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'registration',
    query: {},
    push: mockPush
  }),
}));

describe('AuthContainer', () => {
  const getComponent = (footer?: () => ReactNode, children?: ReactChildren) => {
    return (
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer footer={footer}>{children}</AuthContainer>
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  it('should render login form if children were not provided', async () => {
    const wrapper = await mount(getComponent());
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it('should render login footer if prop was not provided', () => {
    const wrapper = mount(getComponent());
    expect(wrapper.find(LoginFooter)).toHaveLength(1);
  });

  it('should render custom footer if prop was provided', () => {
    const wrapper = mount(getComponent(() => <div className={'content'} />));
    expect(wrapper.find('.content')).toHaveLength(1);
  });

  it('should render children when provided', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer>
            <div id={'children'} />
          </AuthContainer>
        </SnackbarProvider>
      </MockReduxProvider>
    );
    expect(wrapper.find('#children')).toHaveLength(1);
  });

  it('should not push the route if user is not logged', async () => {
    jest.spyOn(authorizationStore, 'getAuthToken').mockReturnValue('');
    await mount(getComponent());
    expect(mockPush).not.toBeCalled();
  });

  it('should push the route if user is already logged', async () => {
    jest.spyOn(authorizationStore, 'getAuthToken').mockReturnValue('token');
    await mount(getComponent());
    expect(mockPush).toBeCalled();
  });
});
