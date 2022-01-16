import renderer from 'react-test-renderer';
import { NoteSkeletonRow } from './NoteSkeletonRow';

describe('NoteSkeletonRow', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<NoteSkeletonRow />);
    expect(tree).toMatchSnapshot();
  });
});
