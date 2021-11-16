import renderer from 'react-test-renderer';
import { NotSelectedSection } from './NotSelectedSection';

describe('NotSelectedSection', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<NotSelectedSection />);
    expect(tree).toMatchSnapshot();
  });
});
