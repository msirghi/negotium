import { MockReduxProvider } from '../../../../../../common/tests/TestUtils';
import { ThemeSettings } from './ThemeSettings';
import renderer, { act } from 'react-test-renderer';
import { reduxStoreMock } from '../../../../../../common/tests/mockData/redux-store-mock';
import AccountService from '../../../../../../services/AccountService';
import { mount } from 'enzyme';
import { ThemeItem } from './item/ThemeItem';

describe('ThemeSettings', () => {
  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStoreMock}>
        <ThemeSettings />
      </MockReduxProvider>
    );
  };

  beforeEach(() => {
    AccountService.updateUserTheme = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should not make api call to update theme if same theme is selected', () => {
    const wrapper = mount(renderComponent());
    const themeItem = wrapper.find(ThemeItem).at(0);

    act(() => {
      themeItem.props().onClick(reduxStoreMock.account.metadata.theme);
    });
    expect(AccountService.updateUserTheme).not.toBeCalled();
  });

  it('should make an api call to update theme if another theme is selected', () => {
    const wrapper = mount(renderComponent());
    const themeItem = wrapper.find(ThemeItem).at(0);

    act(() => {
      themeItem.props().onClick('red');
    });
    expect(AccountService.updateUserTheme).toBeCalled();
  });
});
