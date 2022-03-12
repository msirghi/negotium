import { renderHook } from '@testing-library/react-hooks';
import { MockReduxProvider } from '../../tests/TestUtils';
import ProjectService from '../../../services/ProjectService';
import { projectsMock } from '../../tests/mockData/projects-mock';
import { useFetchProjects } from './useFetchProjects';

describe('useFetchProjects', () => {
  beforeEach(() => {
    jest.spyOn(ProjectService, 'getProjects').mockImplementation(() => Promise.resolve(projectsMock));
  });

  afterEach(jest.clearAllMocks);

  const componentWithRedux = ({ children }: any) => <MockReduxProvider reduxStore={{}}>{children}</MockReduxProvider>;

  it('should fetch the tasks', async () => {
    const { result } = renderHook(() => useFetchProjects(), { wrapper: componentWithRedux });
    await result.current.fetchProjects();
    expect(ProjectService.getProjects).toBeCalled();
  });
});
