import { mount } from 'enzyme';
import { AccountMenu } from './AccountMenu';
import { act } from '@testing-library/react';
import { SiteSettingsDialog } from '../settings/SiteSettingsDialog';
import { MockReduxProvider } from '../../../../../common/tests/TestUtils';
import { accountInfoMock } from '../../../../../common/tests/mockData/account-mock';
import { Menu } from '@mui/material';

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
        <AccountMenu {...defaultProps} />
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
        <AccountMenu {...defaultProps} />
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
        <AccountMenu {...defaultProps} />
      </MockReduxProvider>
    );
    const menuElement = wrapper.find(Menu).at(0) as any;

    act(() => {
      menuElement.props().onClose({} as any, 'backdropClick');
    });
    wrapper.update();
    expect(menuElement.props().anchorEl).toBeNull();
  });
});
