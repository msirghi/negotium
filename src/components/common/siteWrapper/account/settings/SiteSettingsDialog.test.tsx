import { mount } from 'enzyme';
import { SiteSettingsDialog } from './SiteSettingsDialog';
import { Dialog, DialogContent } from '@mui/material';
import { act } from '@testing-library/react';
import { SettingsDialogMenu } from './menu/SettingsDialogMenu';
import { SETTINGS_OPTIONS } from '../../../../../common/types/enums';
import { GeneralSettings } from './general/GeneralSettings';
import { MockReduxProvider } from '../../../../../common/tests/TestUtils';
import { accountInfoMock } from '../../../../../common/tests/mockData/account-mock';

describe('SiteSettingsDialog', () => {
  const defaultProps = {
    open: true,
    setOpen: jest.fn(),
  };

  const reduxStore = {
    account: {
      info: accountInfoMock,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderContent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStore}>
        <SiteSettingsDialog {...defaultProps} />
      </MockReduxProvider>
    );
  };

  it('should render the content', () => {
    const wrapper = mount(renderContent());
    expect(wrapper.find(DialogContent)).not.toHaveLength(0);
  });

  it('should handle dialog close event', () => {
    const wrapper = mount(renderContent());
    const dialog = wrapper.find(Dialog);

    act(() => {
      dialog!.props!().onClose!({} as any, 'backdropClick');
    });
    expect(defaultProps.setOpen).toBeCalled();
  });

  it('should handle dialog close event via close icon click', () => {
    const wrapper = mount(renderContent());
    const closeIcon = wrapper.find('#ssd-close-icon').at(0);

    act(() => {
      closeIcon.simulate('click');
    });
    expect(defaultProps.setOpen).toBeCalled();
  });

  it('should render general settings on general item click', () => {
    const wrapper = mount(renderContent());
    const dialogMenu = wrapper.find(SettingsDialogMenu);

    act(() => {
      dialogMenu.props().setSelectedItem(SETTINGS_OPTIONS.GENERAL);
    });
    wrapper.update();

    expect(wrapper.find(GeneralSettings)).toHaveLength(1);
  });
});
