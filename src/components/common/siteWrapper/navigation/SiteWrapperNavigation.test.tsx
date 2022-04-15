import { MockReduxProvider, MockThemeProvider } from '../../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { reduxStoreMock } from '../../../../common/tests/mockData/redux-store-mock';
import { SiteWrapperNavigation } from './SiteWrapperNavigation';
import { mount } from 'enzyme';
import { SiteWrapperDrawer } from '../drawer/SiteWrapperDrawer';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { act } from 'react-test-renderer';

jest.mock('next/router', () => require('next-router-mock'));

describe('SiteWrapperNavigation', () => {
  const defaultProps = {
    drawerWidth: 240,
    mobileOpen: true,
    handleDrawerToggle: jest.fn(),
  };

  const renderComponent = () => {
    return (
      <MockThemeProvider>
        <SnackbarProvider>
          <MockReduxProvider reduxStore={reduxStoreMock}>
            <SiteWrapperNavigation {...defaultProps} />
          </MockReduxProvider>
        </SnackbarProvider>
      </MockThemeProvider>
    );
  };

  it('should render drawer', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(SiteWrapperDrawer)).not.toHaveLength(0);
  });

  it('should render container with provided width', () => {
    const wrapper = mount(renderComponent());
    const box = wrapper.find(Box).at(0);
    // @ts-ignore
    expect(box.props().sx.width.sm).toBe(defaultProps.drawerWidth);
  });

  it('should render drawer with open prop taken from props', () => {
    const wrapper = mount(renderComponent());
    const drawer = wrapper.find(Drawer).at(0);
    expect(drawer.props().open).toBe(defaultProps.mobileOpen);
  });

  it('should handle drawer toggle action', () => {
    const wrapper = mount(renderComponent());
    const drawer = wrapper.find(Drawer).at(0);
    act(() => {
      drawer!.props!().onClose!({}, 'backdropClick');
    });
    expect(defaultProps.handleDrawerToggle).toBeCalled();
  });
});
