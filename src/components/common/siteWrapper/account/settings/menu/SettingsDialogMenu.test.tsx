import { accountInfoMock } from '../../../../../../common/tests/mockData/account-mock';
import TestUtils, {
  MockReduxProvider,
} from '../../../../../../common/tests/TestUtils';
import { SettingsDialogMenu } from './SettingsDialogMenu';
import { SETTINGS_OPTIONS } from '../../../../../../common/types/enums';
import { mount } from 'enzyme';
import { SettingsMenuListItem } from './item/SettingsMenuListItem';
import { act } from 'react-test-renderer';
import { Row } from '../../../../utilities/row/Row';
import { RowDirection } from '../../../../../../common/constants/enums';

describe('SettingsDialogMenu', () => {
  const defaultProps = {
    selectedItem: SETTINGS_OPTIONS.ACCOUNT,
    setSelectedItem: jest.fn(),
  };
  const reduxState = {
    account: {
      info: accountInfoMock,
    },
  };

  const renderContent = (additionalProps = {}) => {
    return (
      <MockReduxProvider reduxStore={reduxState}>
        <SettingsDialogMenu {...defaultProps} {...additionalProps} />
      </MockReduxProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render items', () => {
    const wrapper = mount(renderContent());
    expect(wrapper.find(SettingsMenuListItem)).not.toHaveLength(0);
  });

  it('should have active flag on account item', () => {
    const wrapper = mount(renderContent());
    const accountItem = wrapper.find(SettingsMenuListItem).at(0);
    expect(accountItem.props().isActive).toBeTruthy();
  });

  it('should call prop method on account option select', () => {
    const wrapper = mount(renderContent());
    const accountItem = wrapper.find(SettingsMenuListItem).at(0);
    act(() => {
      accountItem.props().onClick();
    });
    expect(defaultProps.setSelectedItem).toBeCalledWith(
      SETTINGS_OPTIONS.ACCOUNT
    );
  });

  it('should have active flag on general item', () => {
    const wrapper = mount(
      renderContent({ selectedItem: SETTINGS_OPTIONS.GENERAL })
    );
    const accountItem = wrapper.find(SettingsMenuListItem).at(1);
    expect(accountItem.props().isActive).toBeTruthy();
  });

  it('should call prop method on general option select', () => {
    const wrapper = mount(renderContent());
    const accountItem = wrapper.find(SettingsMenuListItem).at(1);
    act(() => {
      accountItem.props().onClick();
    });
    expect(defaultProps.setSelectedItem).toBeCalledWith(
      SETTINGS_OPTIONS.GENERAL
    );
  });

  it('should have active flag on themes item', () => {
    const wrapper = mount(
      renderContent({ selectedItem: SETTINGS_OPTIONS.THEMES })
    );
    const accountItem = wrapper.find(SettingsMenuListItem).at(2);
    expect(accountItem.props().isActive).toBeTruthy();
  });

  it('should call prop method on themes  option select', () => {
    const wrapper = mount(renderContent());
    const accountItem = wrapper.find(SettingsMenuListItem).at(2);
    act(() => {
      accountItem.props().onClick();
    });
    expect(defaultProps.setSelectedItem).toBeCalledWith(
      SETTINGS_OPTIONS.THEMES
    );
  });

  it('should have row with right direction on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(renderContent());
    expect(wrapper.find(Row).at(0).props().direction).toEqual(
      RowDirection.ROW
    );
  });

  it('should have row with right direction on desktop', () => {
    window.matchMedia = TestUtils.createMatchMedia(1024) as any;
    const wrapper = mount(renderContent());
    expect(wrapper.find(Row).at(0).props().direction).toEqual(
      RowDirection.COLUMN
    );
  });
});
