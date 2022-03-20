import { mount } from 'enzyme';
import { FeatureWrapper } from './FeatureWrapper';

describe('FeatureWrapper', () => {
  const defaultProps = {
    title: 'Title',
    subtitle: 'Subtitle',
    image: 'image',
  };

  it('should render title & subtitle', () => {
    const wrapper = mount(<FeatureWrapper {...defaultProps} />);
    const text = wrapper.text();
    expect(text).toContain(defaultProps.title);
    expect(text).toContain(defaultProps.subtitle);
  });

  it('should render title if revert prop is provided', () => {
    const wrapper = mount(<FeatureWrapper {...defaultProps} revert />);
    const text = wrapper.text();
    expect(text).toContain(defaultProps.title);
  });
});
