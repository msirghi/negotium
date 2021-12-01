import renderer from 'react-test-renderer';
import { FullscreenLoader } from './FullscreenLoader';

describe('Fullscreen loader', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<FullscreenLoader />);
    expect(tree).toMatchSnapshot();
  });
});
