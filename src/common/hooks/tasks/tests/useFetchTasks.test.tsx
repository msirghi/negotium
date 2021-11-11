import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { IGetTasksResponse } from '../../../requests/types';
import { tasksRequests } from '../../../requests/tasksRequests';
import { useFetchTasks } from '../useFetchTasks';

describe('useFetchTasks', () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeAll(() => {
    tasksRequests.fetchTasks = jest.fn(() =>
      Promise.resolve({
        tasks: [],
      } as IGetTasksResponse)
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get the response from the hook', async () => {
    const { result, waitFor } = renderHook(() => useFetchTasks(), {
      wrapper,
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual({ tasks: [] });
  });
});
