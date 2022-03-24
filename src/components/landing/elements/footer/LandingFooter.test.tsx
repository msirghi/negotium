import Image from 'next/image';
import { shallow } from 'enzyme';
import { LandingFooter } from './LandingFooter';

describe('LandingFooter', () => {
  it('should render image', () => {
    const wrapper = shallow(<LandingFooter />);
    expect(wrapper.find(Image)).toHaveLength(1);
  });
});
