import { act, render, waitFor } from '@testing-library/react';
import { SiteWrapperProjectsList } from './SiteWrapperProjectsList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { projectsRequests } from '../../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../../common/tests/mockData/projects-mock';
import {
  MockReduxProvider,
  MockThemeProvider,
} from '../../../../../common/tests/TestUtils';
import ProjectService from '../../../../../services/ProjectService';
import { mount } from 'enzyme';
import { ProjectDialog } from '../wrapper/projectDialog/ProjectDialog';
import { SiteWrapperList } from '../wrapper/SiteWrapperList';
import { ListItem } from '@mui/material';

const mockProjects = [...projectsMock];
const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {
      id: mockProjects[0].id,
    },
    push: mockPush,
  }),
}));

describe('SiteWrapperProjectsList', () => {
  const queryClient = new QueryClient();
  const reduxStore = {
    projects: {
      projects: [...projectsMock],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => (
    <MockReduxProvider reduxStore={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <MockThemeProvider>
          <SiteWrapperProjectsList />
        </MockThemeProvider>
      </QueryClientProvider>
    </MockReduxProvider>
  );

  it('should render project list', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );

    const { getByTestId } = render(renderComponent());

    await waitFor(() => {
      expect(getByTestId('projects-list')).toBeInTheDocument();
    });
  });

  it('should add a new project', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );
    ProjectService.addProject = jest.fn(() => Promise.resolve()) as any;

    const wrapper = mount(renderComponent());

    const dialog = wrapper.find(ProjectDialog);
    act(() => {
      dialog.props().onSubmit('new');
    });
    expect(ProjectService.addProject).toBeCalled();
  });

  it('should handle project item click', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );

    const wrapper = mount(renderComponent());
    const item = wrapper.find(ListItem).at(0);
    act(() => {
      item.simulate('click');
    });
    expect(mockPush).toBeCalled();
  });

  it('should handle dialog open', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );
    ProjectService.addProject = jest.fn(() => Promise.resolve()) as any;

    const wrapper = mount(renderComponent());

    const wrapperList = wrapper.find(SiteWrapperList);
    act(() => {
      wrapperList.props().options?.addOptions?.onClick();
    });
    wrapper.update();

    expect(wrapper.find(ProjectDialog).props().open).toBeTruthy();
  });
});
