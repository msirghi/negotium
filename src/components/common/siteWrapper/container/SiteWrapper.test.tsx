import { SiteWrapper } from './SiteWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { projectsRequests } from '../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { mount } from 'enzyme';
import TestUtils, { MockReduxProvider } from '../../../../common/tests/TestUtils';
import AuthService from '../../../../services/AuthService';
import { reduxStoreMock } from '../../../../common/tests/mockData/redux-store-mock';
import AccountService from '../../../../services/AccountService';
import ThemeUtils from '../../../../common/utils/themeUtils';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SiteWrapper', () => {
  const queryClient = new QueryClient();
  const reduxStore = { ...reduxStoreMock };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    AccountService.getUserMetadata = jest.fn(() => Promise.resolve({ data: { theme: 'noir' } })) as any;
    projectsRequests.fetchProjects = jest.fn(() => Promise.resolve([...projectsMock]));
    AuthService.getUserInfo = jest.fn(() => Promise.resolve() as any);
  });

  it('should render children', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <SiteWrapper>
            <div id={'content'} />
          </SiteWrapper>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    expect(wrapper.find('#content')).toHaveLength(1);
  });

  it('should handle drawer status on open drawer button click', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <SiteWrapper>
            <div id={'content'} />
          </SiteWrapper>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    wrapper.update();
    const button = wrapper.find('#menu-icon').at(0);
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find('#drawer').at(0).props().open).toBeTruthy();
  });

  it('should get user info on mount', () => {
    mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <SiteWrapper>
            <div id={'content'} />
          </SiteWrapper>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    expect(AuthService.getUserInfo).toBeCalled();
  });

  it('should fetch user metadata on mount', () => {
    mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <SiteWrapper>
            <div id={'content'} />
          </SiteWrapper>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    expect(AccountService.getUserMetadata).toBeCalled();
  });

  it('should validate fetched theme', async () => {
    ThemeUtils.isValidTheme = jest.fn(() => false);
    await mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <SiteWrapper>
            <div id={'content'} />
          </SiteWrapper>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    expect(ThemeUtils.isValidTheme).toBeCalled();
  });
});
