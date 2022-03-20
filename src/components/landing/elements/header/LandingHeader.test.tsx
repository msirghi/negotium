import { mount } from 'enzyme';
import { LandingHeader } from './LandingHeader';
import { HeaderLink } from './link/HeaderLink';

describe('LandingHeader', () => {
  const renderComponent = () => {
    return (
      <LandingHeader>
        <div id={'test'}>Test</div>
      </LandingHeader>
    );
  };

  it('should render 3 header links', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(HeaderLink)).toHaveLength(3);
  });

  it('should render children', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find('#test')).toHaveLength(1);
  });
});
