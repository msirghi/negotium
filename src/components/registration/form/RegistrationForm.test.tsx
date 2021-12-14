import { SnackbarProvider } from 'notistack';
import { RegistrationForm } from './RegistrationForm';
import renderer, { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import AuthService from '../../../services/AuthService';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'registration',
    push: mockPush,
  }),
}));

describe('RegistrationForm', () => {
  const renderComponent = () => {
    return (
      <SnackbarProvider>
        <RegistrationForm />
      </SnackbarProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const getFormFields = () => {
    const renderer = render(renderComponent());
    const { getByTestId } = renderer;
    const nameField = getByTestId('name-field');
    const emailField = getByTestId('email-field');
    const passwordField = getByTestId('password-field');
    const repeatPasswordField = getByTestId('repeat-password-field');
    const submitButton = getByTestId('submit-button');
    return {
      renderer,
      nameField,
      emailField,
      passwordField,
      repeatPasswordField,
      submitButton,
    };
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should submit the form properly', async () => {
    AuthService.register = jest.fn(() => Promise.resolve() as any);
    const {
      repeatPasswordField,
      passwordField,
      nameField,
      emailField,
      submitButton,
    } = getFormFields();

    act(() => {
      fireEvent.change(nameField, { target: { value: 'Mihail' } });
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordField, { target: { value: 'Test123@!' } });
      fireEvent.change(repeatPasswordField, { target: { value: 'Test123@!' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(mockPush).toBeCalledWith('/login');
    });
  });

  it('should not push the router if api call failed', async () => {
    AuthService.register = jest.fn(() => Promise.reject() as any);
    const {
      nameField,
      repeatPasswordField,
      passwordField,
      submitButton,
      emailField,
    } = getFormFields();

    act(() => {
      fireEvent.change(nameField, { target: { value: 'Name' } });
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordField, { target: { value: 'Test123@!' } });
      fireEvent.change(repeatPasswordField, { target: { value: 'Test123@!' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(mockPush).not.toBeCalledWith('/login');
    });
  });

  it('should show the email error', async () => {
    const { emailField, submitButton, renderer } = getFormFields();

    act(() => {
      fireEvent.change(emailField, { target: { value: 'email' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(renderer.getByText('errors.invalidEmail')).toBeInTheDocument();
    });
  });

  it('should show the error if passwords do not match', async () => {
    const { submitButton, renderer, repeatPasswordField, passwordField } =
      getFormFields();

    act(() => {
      fireEvent.change(repeatPasswordField, { target: { value: 'Value' } });
      fireEvent.change(passwordField, { target: { value: 'value' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(
        renderer.getByText('errors.passwordsMismatch')
      ).toBeInTheDocument();
    });
  });
});
