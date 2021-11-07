import { useQuery } from 'react-query';
import { projectsRequests } from '../../requests/projectsRequests';

export function useFetchProjects() {
  return useQuery('projectData', projectsRequests.fetchProjects);
}
