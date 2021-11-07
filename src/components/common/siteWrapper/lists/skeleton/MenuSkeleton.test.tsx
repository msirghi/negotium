import renderer from 'react-test-renderer';
import { MenuSkeleton } from './MenuSkeleton';
import { mount } from 'enzyme';
import { Skeleton } from '@mui/material';

describe('MenuSkeleton', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<MenuSkeleton />);
    expect(tree).toMatchSnapshot();
  });

  it('should render 4 skeletons', () => {
    const wrapper = mount(<MenuSkeleton />);
    expect(wrapper.find(Skeleton)).toHaveLength(4);
  });
});
