import { accountInfoMock } from '../../../../../../common/tests/mockData/account-mock';
import renderer, { act } from 'react-test-renderer';
import TestUtils, {
  MockReduxProvider,
} from '../../../../../../common/tests/TestUtils';
import { AccountSettings } from './AccountSettings';
import { mount } from 'enzyme';
import { TextField } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import AccountService from '../../../../../../services/AccountService';

describe('AccountSettings', () => {
  const defaultProps = {};
  const reduxState = {
    account: {
      info: accountInfoMock,
    },
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render input with the default value', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    const nameField = wrapper.find('#name-field').at(0);
    expect(nameField.props().value).toEqual(accountInfoMock.name);
  });

  it('should render full width field on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(600) as any;
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    expect(wrapper.find(TextField).at(0).props().fullWidth).toBeTruthy();
  });

  it('should have initial name value taken from redux', () => {
    const { getByTestId } = render(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    const nameField = getByTestId('name-field');
    expect(nameField).toHaveValue(reduxState.account.info.name);
  });

  it('should show save button on name change', () => {
    const { getByTestId } = render(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    const nameField = getByTestId('name-field');

    act(() => {
      fireEvent.change(nameField, { target: { value: 'New name' } });
    });
    expect(getByTestId('name-save-button')).toBeInTheDocument();
  });

  it('should call the api on name update', () => {
    AccountService.updateUserName = jest.fn(() => Promise.resolve()) as any;
    const { getByTestId } = render(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    const nameField = getByTestId('name-field');

    act(() => {
      fireEvent.change(nameField, { target: { value: 'New name' } });
      fireEvent.click(getByTestId('name-save-button'));
    });
    expect(AccountService.updateUserName).toBeCalled();
  });

  it('should reset the name on button click', () => {
    const { getByTestId } = render(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    const nameField = getByTestId('name-field');

    act(() => {
      fireEvent.change(nameField, { target: { value: 'New name' } });
      fireEvent.click(getByTestId('name-cancel-button'));
    });
    expect(nameField).toHaveValue(reduxState.account.info.name);
  });
});
