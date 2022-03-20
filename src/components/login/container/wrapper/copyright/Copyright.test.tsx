import { mount } from 'enzyme';
import { Copyright } from './Copyright';
import { Typography } from '@mui/material';

describe('Copyright', () => {
  const defaultProps = {
    sx: {},
  };

  it('should render Typography', () => {
    const wrapper = mount(<Copyright {...defaultProps} />);
    expect(wrapper.find(Typography)).not.toHaveLength(0);
  });
});
