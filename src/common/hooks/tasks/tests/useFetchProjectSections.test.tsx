import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { tasksRequests } from '../../../requests/tasksRequests';
import { useFetchTasks } from '../useFetchTasks';
import { useFetchProjectTasks } from '../useFetchProjectTasks';
import {useFetchProjectSections} from "../useFetchProjectSections";

describe('useFetchProjectSections', () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeAll(() => {
    tasksRequests.fetchProjectSections = jest.fn(() =>
      Promise.resolve({
        tasks: [],
      } as any)
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get the response from the hook', async () => {
    const { result, waitFor } = renderHook(
      () => useFetchProjectSections('projectId'),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual({ tasks: [] });
  });
});
