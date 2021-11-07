import { render, waitFor } from '@testing-library/react';
import { SiteWrapperProjectsList } from './SiteWrapperProjectsList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { projectsRequests } from '../../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../../common/tests/mockData/projects-mock';
import { IGetProjectResponse } from '../../../../../common/requests/types';

describe('SiteWrapperProjectsList', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render project list', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve({
        projects: [...projectsMock],
      } as IGetProjectResponse)
    );

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <SiteWrapperProjectsList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByTestId('projects-list')).toBeInTheDocument();
    });
  });
});
