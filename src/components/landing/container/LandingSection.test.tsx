import { shallow } from 'enzyme';
import LandingPage from './LandingPage';
import { HeroSection } from '../elements/hero/HeroSection';
import { FeaturesSection } from '../elements/features/FeaturesSection';
import { StartSection } from '../elements/start/StartSection';

describe('LandingPage', () => {
  it('should render sections', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find(HeroSection)).toHaveLength(1);
    expect(wrapper.find(FeaturesSection)).toHaveLength(1);
    expect(wrapper.find(StartSection)).toHaveLength(1);
  });
});
