import { useQuery } from 'react-query';
import { tasksRequests } from '../../requests/tasksRequests';

export function useFetchTasksBySection() {
  return useQuery('sectionsQuery', tasksRequests.fetchTasksGroupedBySection);
}
