import renderer from 'react-test-renderer';
import { TaskWrapper } from './TaskWrapper';

describe('TaskWrapper', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(<TaskWrapper {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });
});
