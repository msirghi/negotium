import renderer from 'react-test-renderer';
import { TaskSkeleton } from './TaskSkeleton';
import { mount } from 'enzyme';
import { Skeleton } from '@mui/material';

describe('TaskSkeleton', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<TaskSkeleton />);
    expect(tree).toMatchSnapshot();
  });

  it('should render skeletons', () => {
    const wrapper = mount(<TaskSkeleton />);
    expect(wrapper.find(Skeleton)).not.toHaveLength(0);
  });
});
