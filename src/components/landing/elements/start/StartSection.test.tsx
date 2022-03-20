import { mount } from 'enzyme';
import { StartSection } from './StartSection';
import { Button } from '@mui/material';
import mockRouter from 'next-router-mock';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

mockRouter.push = jest.fn();

describe('StartSection', () => {
  it('should render button', () => {
    const wrapper = mount(<StartSection />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should push the route on button click', () => {
    const wrapper = mount(<StartSection />);
    const button = wrapper.find(Button);
    button.simulate('click');
    expect(mockRouter.push).toBeCalled();
  });
});
