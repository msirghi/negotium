import { tasksRequests } from '../../requests/tasksRequests';
import { useQuery } from 'react-query';

export function useFetchProjectSections(projectId: string) {
    return useQuery('projectProjectSections', () =>
        tasksRequests.fetchProjectSections(projectId)
    );
}
