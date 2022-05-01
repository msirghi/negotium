import TestUtils from '../../../../common/tests/TestUtils';
import { mount, shallow } from 'enzyme';
import { HeroSection } from './HeroSection';
import { Row } from '../../../common/utilities/row/Row';
import { RowDirection } from '../../../../common/constants/enums';

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
});
