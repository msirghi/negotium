import TestUtils from '../../../../common/tests/TestUtils';
import { mount, shallow } from 'enzyme';
import { HeroSection } from './HeroSection';
import { Row } from '../../../common/utilities/row/Row';
import { RowDirection } from '../../../../common/constants/enums';
import mockRouter from 'next-router-mock';
import {Button} from "@mui/material";
import Routes from "../../../../common/config/routes";

mockRouter.push = jest.fn();

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('HeroSection', () => {
  it('should render row with COLUMN as a direction on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(<HeroSection />);
    const row = wrapper.find(Row);
    expect(row.props().direction).toBe(RowDirection.COLUMN);
  });

  it('should render row with ROW as a direction on desktop', () => {
    window.matchMedia = TestUtils.createMatchMedia(1024) as any;
    const wrapper = shallow(<HeroSection />);
    const row = wrapper.find(Row);
    expect(row.props().direction).toBe(RowDirection.ROW);
  });

  it('should redirect to registration page on button click', () => {
    const wrapper = shallow(<HeroSection />);
    const button = wrapper.find(Button);
    button.simulate('click');
    expect(mockRouter.push).toBeCalledWith(Routes.registration);
  });
});
