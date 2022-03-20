import renderer from 'react-test-renderer';
import { Curve } from './Curve';

describe('Curve', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<Curve fill={'red'} />);
    expect(tree).toMatchSnapshot();
  });
});
