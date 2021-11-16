import { tasksRequests } from '../../requests/tasksRequests';
import { useQuery } from 'react-query';

export function useFetchProjectTasks(projectId: string) {
  return useQuery('projectTasks', () =>
    tasksRequests.fetchTasksByProject(projectId)
  );
}
