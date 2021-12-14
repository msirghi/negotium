import { mount } from 'enzyme';
import { AuthContainer } from './AuthContainer';
import { LoginForm } from '../form/LoginForm';
import { LoginFooter } from '../footer/LoginFooter';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'registration',
    query: {},
  }),
}));

describe('AuthContainer', () => {
  it('should render login form if children were not provided', async () => {
    const wrapper = await mount(
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it('should render login footer if prop was not provided', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    expect(wrapper.find(LoginFooter)).toHaveLength(1);
  });

  it('should render custom footer if prop was provided', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={{}}>
        <SnackbarProvider>
          <AuthContainer footer={() => <div className={'content'} />} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
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
