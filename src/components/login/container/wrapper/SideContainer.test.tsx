import { mount, shallow } from 'enzyme';
import SideContainer from './SideContainer';
import { Typography } from '@mui/material';
import { LoginFooter } from '../../footer/LoginFooter';
import { RegistrationForm } from '../../../registration/form/RegistrationForm';

describe('SideContainer', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('should render provided title', () => {
    const wrapper = mount(<SideContainer {...defaultProps} />);
    expect(wrapper.find(Typography).at(0).props().children).toBe(defaultProps.title);
  });

  it('should render login footer by default', () => {
    const wrapper = mount(<SideContainer {...defaultProps} />);
    expect(wrapper.find(LoginFooter)).toHaveLength(1);
  });

  it('should render provided footer', () => {
    const footer = () => <RegistrationForm />;
    const wrapper = shallow(<SideContainer {...defaultProps} renderFooter={footer} />);
    expect(wrapper.find(RegistrationForm)).toHaveLength(1);
  });
});
