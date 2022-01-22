import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { GetTasksWithSectionResponse } from '../../../requests/types';
import { tasksRequests } from '../../../requests/tasksRequests';
import { useFetchTasksBySection } from '../useFetchTasksBySection';

describe('useFetchTasksBySection', () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeAll(() => {
    tasksRequests.fetchTasksGroupedBySection = jest.fn(() =>
      Promise.resolve({
        data: [],
      } as GetTasksWithSectionResponse)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get the response from the hook', async () => {
    const { result, waitFor } = renderHook(() => useFetchTasksBySection(), {
      wrapper,
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(result.current.data).toEqual({ data: [] });
  });
});
