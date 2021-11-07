import { SiteWrapper } from './SiteWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { projectsRequests } from '../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { IGetProjectResponse } from '../../../../common/requests/types';
import { mount } from 'enzyme';
import TestUtils from '../../../../common/tests/TestUtils';

describe('SiteWrapper', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve({
        projects: [...projectsMock],
      } as IGetProjectResponse)
    );
  });

  it('should render children', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <SiteWrapper>
          <div id={'content'} />
        </SiteWrapper>
      </QueryClientProvider>
    );
    expect(wrapper.find('#content')).toHaveLength(1);
  });

  it('should handle drawer status on open drawer button click', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <SiteWrapper>
          <div id={'content'} />
        </SiteWrapper>
      </QueryClientProvider>
    );
    wrapper.update();
    const button = wrapper.find('#menu-icon').at(0);
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find('#drawer').at(0).props().open).toBeTruthy();
  });
});
