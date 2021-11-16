import { SiteWrapper } from './SiteWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { projectsRequests } from '../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { mount } from 'enzyme';
import TestUtils, {
  MockReduxProvider,
} from '../../../../common/tests/TestUtils';

const mockProjects = [...projectsMock];

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {
      id: mockProjects[0].id,
    },
  }),
}));

describe('SiteWrapper', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );
  });

  it('should render children', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={{}}>
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
      <MockReduxProvider reduxStore={{}}>
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
});
