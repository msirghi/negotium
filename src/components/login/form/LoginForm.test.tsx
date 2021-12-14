import { SnackbarProvider } from 'notistack';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { LoginForm } from './LoginForm';
import renderer, { act } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import AuthService from '../../../services/AuthService';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {},
    push: mockPush,
  }),
}));

describe('LoginForm', () => {
  const getComponent = () => {
    return (
      <SnackbarProvider>
        <MockReduxProvider reduxStore={{}}>
          <LoginForm />
        </MockReduxProvider>
      </SnackbarProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should match the snapshot', () => {
    const tree = renderer.create(getComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should have disabled submit button by default', () => {
    const { getByTestId } = render(getComponent());
    expect(getByTestId('submit-button')).toBeDisabled();
  });

  it('should handle form submission', () => {
    AuthService.login = jest.fn(() =>
      Promise.resolve({ data: { access_token: 'token' } })
    ) as any;
    AuthService.getUserInfo = jest.fn(() =>
      Promise.resolve({ data: {} })
    ) as any;
    const renderer = render(getComponent());
    const { getByTestId } = renderer;
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
      fireEvent.click(submitButton);
    });
    expect(AuthService.login).toBeCalled();
  });

  it('should handle the api error', () => {
    AuthService.login = jest.fn(() => Promise.reject('Reject')) as any;
    const {getByTestId} = render(getComponent());
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
      fireEvent.click(submitButton);
    });
    expect(mockPush).not.toBeCalled();
  });
});
