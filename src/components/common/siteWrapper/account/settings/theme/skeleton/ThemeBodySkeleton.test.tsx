import renderer from 'react-test-renderer';
import { ThemeBodySkeleton } from './ThemeBodySkeleton';

describe('ThemeBodySkeleton', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<ThemeBodySkeleton />);
    expect(tree).toMatchSnapshot();
  });
});
