import { mount } from 'enzyme';
import { ContentBox } from './ContentBox';

describe('ContentBox', () => {
  it('should render children', () => {
    const wrapper = mount(
      <ContentBox>
        <div id={'content'} />
      </ContentBox>
    );
    expect(wrapper.find('#content')).toHaveLength(1);
  });
});
