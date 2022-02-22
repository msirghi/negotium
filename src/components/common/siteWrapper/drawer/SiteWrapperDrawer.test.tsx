import { mount } from 'enzyme';
import { SiteWrapperDrawer } from './SiteWrapperDrawer';
import { SiteWrapperMainList } from '../lists/main/SiteWrapperMainList';
import { SiteWrapperProjectsList } from '../lists/projects/SiteWrapperProjectsList';
import { projectsRequests } from '../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  MockReduxProvider,
  MockThemeProvider,
} from '../../../../common/tests/TestUtils';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SiteWrapperDrawer', () => {
  const queryClient = new QueryClient();
  const reduxStore = {
    projects: {
      projects: [...projectsMock],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );
  });

  it('should render main list', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <MockThemeProvider>
            <SiteWrapperDrawer />
          </MockThemeProvider>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    expect(wrapper.find(SiteWrapperMainList)).toHaveLength(1);
  });

  it('should render projects list', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <QueryClientProvider client={queryClient}>
          <MockThemeProvider>
            <SiteWrapperDrawer />
          </MockThemeProvider>
        </QueryClientProvider>
      </MockReduxProvider>
    );
    expect(wrapper.find(SiteWrapperProjectsList)).toHaveLength(1);
  });
});
