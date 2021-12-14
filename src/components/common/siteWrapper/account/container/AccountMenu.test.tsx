import { mount } from 'enzyme';
import { AccountMenu } from './AccountMenu';
import { act } from '@testing-library/react';
import { SiteSettingsDialog } from '../settings/SiteSettingsDialog';
import { MockReduxProvider } from '../../../../../common/tests/TestUtils';
import { accountInfoMock } from '../../../../../common/tests/mockData/account-mock';
import { Menu, MenuItem } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {},
    push: mockPush,
  }),
}));

describe('AccountMenu', () => {
  const defaultProps = {};
  const reduxStore = {
    account: {
      info: accountInfoMock,
    },
  };

  it('should handle menu opening', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <AccountMenu {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    const accountButton = wrapper.find('#account-circle').at(0);

    act(() => {
      accountButton.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(Menu).props().anchorEl).toBeDefined();
  });

  it('should handle settings dialog opening', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <AccountMenu {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    const settingsItem = wrapper.find('#settings-item').at(0);

    act(() => {
      settingsItem.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(SiteSettingsDialog).props().open).toBeDefined();
  });

  it('should handle handle menu close', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <AccountMenu {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    const menuElement = wrapper.find(Menu).at(0) as any;

    act(() => {
      menuElement.props().onClose({} as any, 'backdropClick');
    });
    wrapper.update();
    expect(menuElement.props().anchorEl).toBeNull();
  });

  it('should handle logout click', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <AccountMenu {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
    const menuItems = wrapper.find(MenuItem);
    const logoutItem = wrapper.find(MenuItem).at(menuItems.length - 2)!;

    act(() => {
      // @ts-ignore
      logoutItem.props().onClick();
    });
    expect(mockPush).toBeCalled();
  });
});
