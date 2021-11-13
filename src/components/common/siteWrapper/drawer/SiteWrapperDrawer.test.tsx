import { mount } from 'enzyme';
import { SiteWrapperDrawer } from './SiteWrapperDrawer';
import { SiteWrapperMainList } from '../lists/main/SiteWrapperMainList';
import { SiteWrapperProjectsList } from '../lists/projects/SiteWrapperProjectsList';
import { projectsRequests } from '../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { IGetProjectResponse } from '../../../../common/requests/types';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
  }),
}));

describe('SiteWrapperDrawer', () => {
  const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <SiteWrapperDrawer />
      </QueryClientProvider>
    );
    expect(wrapper.find(SiteWrapperMainList)).toHaveLength(1);
  });

  it('should render projects list', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <SiteWrapperDrawer />
      </QueryClientProvider>
    );
    expect(wrapper.find(SiteWrapperProjectsList)).toHaveLength(1);
  });
});
