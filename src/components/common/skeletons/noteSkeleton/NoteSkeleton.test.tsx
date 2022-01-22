import renderer from 'react-test-renderer';
import { NoteSkeleton } from './NoteSkeleton';
import TestUtils from '../../../../common/tests/TestUtils';
import { mount } from 'enzyme';
import { Skeleton } from '@mui/material';

describe('NoteSkeleton', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<NoteSkeleton />);
    expect(tree).toMatchSnapshot();
  });

  it('should render skeleton input skeleton with with 100% on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(<NoteSkeleton />);
    expect(wrapper.find(Skeleton).at(0).props().width).toEqual('100%');
  });

  it('should render skeleton input skeleton with with 33% on desktop', () => {
    window.matchMedia = TestUtils.createMatchMedia(1024) as any;
    const wrapper = mount(<NoteSkeleton />);
    expect(wrapper.find(Skeleton).at(0).props().width).toEqual('33%');
  });
});
