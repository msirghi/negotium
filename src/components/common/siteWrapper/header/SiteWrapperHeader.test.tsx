import { noirAppTheme } from '../../../../common/theme/appTheme';
import { mount } from 'enzyme';
import { SiteWrapperHeader } from './SiteWrapperHeader';
import { TaskAdd } from '../taskAdd/TaskAdd';
import { AccountMenu } from '../account';
import { MockReduxProvider, MockThemeProvider } from '../../../../common/tests/TestUtils';
import { reduxStoreMock } from '../../../../common/tests/mockData/redux-store-mock';
import { SnackbarProvider } from 'notistack';
import { AppBar, IconButton } from '@mui/material';
import { act } from '@testing-library/react';

describe('SiteWrapperHeader', () => {
  const defaultProps = {
    selectedTheme: noirAppTheme,
    handleDrawerToggle: jest.fn(),
    drawerWidth: 240,
  };

  afterEach(jest.clearAllMocks);

  const renderComponent = () => {
    return (
      <MockThemeProvider>
        <SnackbarProvider>
          <MockReduxProvider reduxStore={reduxStoreMock}>
            <SiteWrapperHeader {...defaultProps} />
          </MockReduxProvider>
        </SnackbarProvider>
      </MockThemeProvider>
    );
  };

  it('should render header action items', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(TaskAdd)).toHaveLength(1);
    expect(wrapper.find(AccountMenu)).toHaveLength(1);
  });

  it('should render AppBar with provided width', () => {
    const wrapper = mount(renderComponent());
    const appBar = wrapper.find(AppBar);
    // @ts-ignore
    expect(appBar.props().sx.ml.sm).toBe(`${defaultProps.drawerWidth}px`);
  });

  it('should handle drawer toggle action', () => {
    const wrapper = mount(renderComponent());
    const iconButton = wrapper.find(IconButton).at(0);
    act(() => {
      iconButton.simulate('click');
    });
    expect(defaultProps.handleDrawerToggle).toBeCalled();
  });
});
