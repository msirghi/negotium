import { useQuery } from 'react-query';
import { tasksRequests } from '../../requests/tasksRequests';

export function useFetchTasks() {
  return useQuery('inboxQuery', tasksRequests.fetchTasks);
}
