import reducer, {
  setProjectsList,
  removeProjectFromList,
} from './projectsSlice';
import { projectsMock } from '../../common/tests/mockData/projects-mock';

describe('Projects slice', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, { type: 'type' });

    expect(result).toEqual({
      projects: [],
    });
  });

  it('should handle project list set', () => {
    const result = reducer({ projects: [] }, setProjectsList(projectsMock));

    expect(result).toEqual({
      projects: projectsMock,
    });
  });

  it('should handle project removal from state', () => {
    const result = reducer(
      { projects: projectsMock },
      removeProjectFromList(projectsMock[0].id)
    );

    expect(result.projects).toHaveLength(projectsMock.length - 1);
  });
});
