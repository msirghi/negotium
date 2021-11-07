import { mount } from 'enzyme';
import { If } from './If';

describe('If', () => {
  const getRenderedContent = () => {
    return <div id={'content'} />;
  };

  it('should render children if condition is true', () => {
    const wrapper = mount(<If condition={true}>{getRenderedContent()}</If>);
    expect(wrapper.find('#content')).toHaveLength(1);
  });

  it('should not render children if condition is false', () => {
    const wrapper = mount(<If condition={false}>{getRenderedContent()}</If>);
    expect(wrapper.find('#content')).not.toHaveLength(1);
  });
});
