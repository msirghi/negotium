import { mount } from 'enzyme';
import { SiteSettingsDialog } from './SiteSettingsDialog';
import { Dialog, DialogContent } from '@mui/material';
import { act } from '@testing-library/react';
import { SettingsDialogMenu } from './menu/SettingsDialogMenu';
import { SETTINGS_OPTIONS } from '../../../../../common/types/enums';
import { GeneralSettings } from './general/GeneralSettings';
import TestUtils, {
  MockReduxProvider,
  MockThemeProvider,
} from '../../../../../common/tests/TestUtils';
import { ThemeSettings } from './theme/ThemeSettings';
import { reduxStoreMock } from '../../../../../common/tests/mockData/redux-store-mock';
import { Row } from '../../../utilities/row/Row';
import { ROW_DIRECTION } from '../../../../../common/constants/enums';
import { SnackbarProvider } from 'notistack';

describe('SiteSettingsDialog', () => {
  const defaultProps = {
    open: true,
    setOpen: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderContent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStoreMock}>
        <SnackbarProvider>
          <MockThemeProvider>
            <SiteSettingsDialog {...defaultProps} />
          </MockThemeProvider>
        </SnackbarProvider>
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

  it('should render theme settings on themes item click', () => {
    const wrapper = mount(renderContent());
    const dialogMenu = wrapper.find(SettingsDialogMenu);

    act(() => {
      dialogMenu.props().setSelectedItem(SETTINGS_OPTIONS.THEMES);
    });
    wrapper.update();

    expect(wrapper.find(ThemeSettings)).toHaveLength(1);
  });

  it('should render row with specific direction on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(renderContent());
    expect(wrapper.find(Row).at(0).props().direction).toEqual(
      ROW_DIRECTION.COLUMN
    );
  });

  it('should render row with specific direction on desktop', () => {
    window.matchMedia = TestUtils.createMatchMedia(1024) as any;
    const wrapper = mount(renderContent());
    expect(wrapper.find(Row).at(0).props().direction).toEqual(
      ROW_DIRECTION.ROW
    );
  });
});
