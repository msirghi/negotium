import { render, waitFor } from '@testing-library/react';
import { SiteWrapperProjectsList } from './SiteWrapperProjectsList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { projectsRequests } from '../../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../../common/tests/mockData/projects-mock';
import { MockReduxProvider } from '../../../../../common/tests/TestUtils';

const mockProjects = [...projectsMock];

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {
      id: mockProjects[0].id,
    },
  }),
}));

describe('SiteWrapperProjectsList', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render project list', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve([...projectsMock])
    );

    const { getByTestId } = render(
      <MockReduxProvider reduxStore={{}}>
        <QueryClientProvider client={queryClient}>
          <SiteWrapperProjectsList />
        </QueryClientProvider>
      </MockReduxProvider>
    );

    await waitFor(() => {
      expect(getByTestId('projects-list')).toBeInTheDocument();
    });
  });
});
