import { mount } from 'enzyme';
import { LandingHeader } from './LandingHeader';
import { HeaderLink } from './link/HeaderLink';

describe('LandingHeader', () => {
  let scrollSpy = jest.fn();

  const renderComponent = () => {
    return (
      <LandingHeader>
        <div id={'test'}>Test</div>
      </LandingHeader>
    );
  };

  beforeEach(() => {
    scrollSpy = jest.fn();
    jest.spyOn(document, 'getElementById').mockImplementation(() => ({ scrollIntoView: scrollSpy } as unknown as HTMLElement));
  });

  afterEach(jest.clearAllMocks);

  it('should render 3 header links', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(HeaderLink)).toHaveLength(3);
  });

  it('should render children', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find('#test')).toHaveLength(1);
  });

  test.each([0, 2])('should scroll on button clicks', (at) => {
    const wrapper = mount(renderComponent());
    const button = wrapper.find(HeaderLink).at(at);
    button.props().onClick();
    expect(scrollSpy).toBeCalled();
  })
});
