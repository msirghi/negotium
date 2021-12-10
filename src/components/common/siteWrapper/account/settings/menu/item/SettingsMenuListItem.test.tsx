import CloseIcon from '@mui/icons-material/Close';
import { mount } from 'enzyme';
import { SettingsMenuListItem } from './SettingsMenuListItem';
import { Row } from '../../../../../utilities/row/Row';
import { act } from 'react-test-renderer';
import TestUtils from '../../../../../../../common/tests/TestUtils';

describe('SettingsMenuListItem', () => {
  const defaultProps = {
    Icon: CloseIcon,
    title: 'Title',
    isActive: false,
    onClick: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the row', () => {
    const wrapper = mount(<SettingsMenuListItem {...defaultProps} />);
    expect(wrapper.find(Row)).toHaveLength(1);
  });

  it('should not render title on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(600) as any;
    const wrapper = mount(<SettingsMenuListItem {...defaultProps} />);
    expect(wrapper.find(`#${defaultProps.title}-item`)).toHaveLength(0);
  });

  it('should render title on desktop', () => {
    window.matchMedia = TestUtils.createMatchMedia(1024) as any;
    const wrapper = mount(<SettingsMenuListItem {...defaultProps} />);
    expect(wrapper.find(`#${defaultProps.title}-item`)).toHaveLength(1);
  });

  it('should call prop method on click', () => {
    const wrapper = mount(<SettingsMenuListItem {...defaultProps} />);
    const row = wrapper.find(Row) as any;
    act(() => {
      row.props().onClick();
    });
    expect(defaultProps.onClick).toBeCalled();
  });
});
