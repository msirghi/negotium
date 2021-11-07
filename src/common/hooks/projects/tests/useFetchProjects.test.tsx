import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchProjects } from '../useFetchProjects';
import { projectsRequests } from '../../../requests/projectsRequests';
import { projectsMock } from '../../../tests/mockData/projects-mock';
import { IGetProjectResponse } from '../../../requests/types';

describe('useFetchProjects', () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeAll(() => {
    projectsRequests.fetchProjects = jest.fn(() =>
      Promise.resolve({
        projects: [...projectsMock],
      } as IGetProjectResponse)
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get the response from the hook', async () => {
    const { result, waitFor } = renderHook(() => useFetchProjects(), {
      wrapper,
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual({ projects: projectsMock });
  });
});
