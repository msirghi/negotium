import renderer from 'react-test-renderer';
import { NativeSelect } from './NativeSelect';

describe('NativeSelect', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<NativeSelect />);
    expect(tree).toMatchSnapshot();
  });
});
