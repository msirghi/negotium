import { ListItemTitle } from './ListItemTitle';
import renderer from 'react-test-renderer';

describe('ListItemTitle', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(<ListItemTitle {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });
});
