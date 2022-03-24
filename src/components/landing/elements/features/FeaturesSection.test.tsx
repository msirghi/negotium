import { mount } from 'enzyme';
import { FeaturesSection } from './FeaturesSection';
import { FeatureWrapper } from './wrapper/FeatureWrapper';
import '../../../../../__mocks__/intersectionObserverMock';

describe('FeaturesSection', () => {
  it('should render 3 features', () => {
    const wrapper = mount(<FeaturesSection />);
    expect(wrapper.find(FeatureWrapper)).toHaveLength(3);
  });
});
