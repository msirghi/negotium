import { mount } from 'enzyme';
import { HeaderLink } from './HeaderLink';
import { Button } from '@mui/material';

describe('HeaderLink', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('should render button with provided label', () => {
    const wrapper = mount(<HeaderLink {...defaultProps} />);
    const button = wrapper.find(Button);
    expect(button.text()).toContain(defaultProps.title);
  });
});
