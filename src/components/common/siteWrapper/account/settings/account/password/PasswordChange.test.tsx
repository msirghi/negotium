import AccountService from '../../../../../../../services/AccountService';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { PasswordChange } from './PasswordChange';
import { act } from 'react-test-renderer';
import ValidationService from '../../../../../../../services/ValidationService';
import { PasswordStrengthStatus } from '../../../../../../../common/constants/enums';

describe('PasswordChange', () => {
  beforeEach(() => {
    jest.spyOn(AccountService, 'updateUserPassword').mockImplementation(() => Promise.resolve({ status: 204 } as any));
  });

  afterEach(jest.clearAllMocks);

  const onBackClickSpy = jest.fn();

  const renderComponent = () => {
    return (
      <SnackbarProvider>
        <PasswordChange onBackClick={onBackClickSpy} />
      </SnackbarProvider>
    );
  };

  const renderAndFillTheForm = (oldPass: string, newPass: string, confirmPass: string) => {
    const renderer = render(renderComponent());
    const { getByTestId } = renderer;

    const oldPasswordField = getByTestId('old-password-field');
    const newPasswordField = getByTestId('new-password-field');
    const confirmPasswordField = getByTestId('confirm-password-field');
    const saveButton = getByTestId('submit-btn');

    act(() => {
      fireEvent.change(oldPasswordField, { target: { value: oldPass } });
      fireEvent.change(newPasswordField, { target: { value: newPass } });
      fireEvent.change(confirmPasswordField, { target: { value: confirmPass } });
      fireEvent.click(saveButton);
    });
    return renderer;
  };

  it('should check password strength on submit', async () => {
    jest.spyOn(ValidationService, 'getPasswordStrength').mockImplementation(() => PasswordStrengthStatus.STRONG);
    renderAndFillTheForm('old', 'new', 'new');
    await waitFor(() => {
      expect(AccountService.updateUserPassword).toBeCalled();
    });
  });

  it('should show the error if new password is too weak', async () => {
    jest.spyOn(ValidationService, 'getPasswordStrength').mockImplementation(() => PasswordStrengthStatus.WEAK);
    const { getByText } = renderAndFillTheForm('old', 'new', 'new');
    await waitFor(() => {
      expect(getByText('change.passwordTooWeak')).toBeInTheDocument();
    });
  });

  it('should show the error if passwords do not match', async () => {
    jest.spyOn(ValidationService, 'getPasswordStrength').mockImplementation(() => PasswordStrengthStatus.STRONG);
    const { getByText } = renderAndFillTheForm('old', 'new', 'new1');
    await waitFor(() => {
      expect(getByText('change.passwordMismatch')).toBeInTheDocument();
    });
  });

  it('should handle back click', () => {
    const { getByTestId } = render(renderComponent());
    const backButton = getByTestId('back-btn');

    act(() => {
      fireEvent.click(backButton);
    });
    expect(onBackClickSpy).toBeCalled();
  });
});
