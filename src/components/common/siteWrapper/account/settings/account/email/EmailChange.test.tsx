import { MockReduxProvider } from '../../../../../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { EmailChange } from './EmailChange';
import renderer, { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import AccountService from '../../../../../../../services/AccountService';

describe('EmailChange', () => {
  const defaultProps = {
    onBackClick: jest.fn(),
  };

  const renderComponent = () => {
    return (
      <MockReduxProvider
        reduxStore={{
          account: {
            info: { email: 'email@email.com' },
          },
        }}
      >
        <SnackbarProvider>
          <EmailChange {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should handle back button click', () => {
    const { getByTestId } = render(renderComponent());
    const backButton = getByTestId('back-button');

    act(() => {
      fireEvent.click(backButton);
    });
    expect(defaultProps.onBackClick).toBeCalled();
  });

  it('should have disabled submit button by default', () => {
    const { getByTestId } = render(renderComponent());
    expect(getByTestId('submit-button')).toBeDisabled();
  });

  it('should submit the the form and show error if email is not valid', async () => {
    const { getByTestId, getByText } = render(renderComponent());
    const newEmailField = getByTestId('new-email-field');
    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(newEmailField, { target: { value: 'value' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(getByText('change.invalidEmail')).toBeInTheDocument();
    });
  });

  it('should submit the the form and show error if there is email mismatch', async () => {
    const { getByTestId, getByText } = render(renderComponent());
    const repeatEmailField = getByTestId('repeat-email-field');
    const submitButton = getByTestId('submit-button');

    act(() => {
      fireEvent.change(repeatEmailField, { target: { value: 'value' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(getByText('change.emailMismatch')).toBeInTheDocument();
    });
  });

  it('should make an api call to update the email is values are valid', async () => {
    const { getByTestId } = render(renderComponent());
    const repeatEmailField = getByTestId('repeat-email-field');
    const newEmailField = getByTestId('new-email-field');
    const submitButton = getByTestId('submit-button');
    const email = 'email@email.com';
    AccountService.updateUserEmail = jest.fn(() => Promise.resolve()) as any;

    act(() => {
      fireEvent.change(repeatEmailField, { target: { value: email } });
      fireEvent.change(newEmailField, { target: { value: email } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(AccountService.updateUserEmail).toBeCalled();
    });
  });

  it('should make an api call to update the email is values are valid and case if different', async () => {
    const { getByTestId } = render(renderComponent());
    const repeatEmailField = getByTestId('repeat-email-field');
    const newEmailField = getByTestId('new-email-field');
    const submitButton = getByTestId('submit-button');
    AccountService.updateUserEmail = jest.fn(() => Promise.resolve()) as any;

    act(() => {
      fireEvent.change(repeatEmailField, {
        target: { value: 'email@email.com' },
      });
      fireEvent.change(newEmailField, { target: { value: 'email@email.COM' } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(AccountService.updateUserEmail).toBeCalled();
    });
  });

  it('should make an api call to update the email is values are valid and show the error if something went wrong', async () => {
    const { getByTestId } = render(renderComponent());
    const repeatEmailField = getByTestId('repeat-email-field');
    const newEmailField = getByTestId('new-email-field');
    const submitButton = getByTestId('submit-button');
    const email = 'email@email.com';
    AccountService.updateUserEmail = jest.fn(() =>
      Promise.reject({ message: 'error' })
    ) as any;

    act(() => {
      fireEvent.change(repeatEmailField, { target: { value: email } });
      fireEvent.change(newEmailField, { target: { value: email } });
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(getByTestId('error-text')).toBeInTheDocument();
    });
  });
});
