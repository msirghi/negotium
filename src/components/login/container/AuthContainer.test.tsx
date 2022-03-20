import { mount } from 'enzyme';
import { AuthContainer } from './AuthContainer';
import { LoginForm } from '../form/LoginForm';
import { LoginFooter } from '../footer/LoginFooter';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { ReactChildren, ReactNode } from 'react';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'registration',
    query: {},
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
});
