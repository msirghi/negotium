import { mount } from 'enzyme';
import { LandingSection } from './LandingSection';
import { Box } from '@mui/system';

describe('LandingSection', () => {
  const defaultProps = {
    backgroundColor: 'red',
    textColor: 'black',
    className: 'class',
  };

  it('should render box with specific background color', () => {
    const wrapper = mount(<LandingSection {...defaultProps} />);
    expect(wrapper.find(Box).props().style!.background).toBe(defaultProps.backgroundColor);
  });

  it('should render box with specific text color', () => {
    const wrapper = mount(<LandingSection {...defaultProps} />);
    expect(wrapper.find(Box).props().style!.color).toBe(defaultProps.textColor);
  });
});
