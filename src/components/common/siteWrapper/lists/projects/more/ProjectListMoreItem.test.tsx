import { mount } from 'enzyme';
import { ProjectListMoreItem } from './ProjectListMoreItem';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

describe('ProjectListMoreItem', () => {
  const defaultProps = {
    toggleShowAll: jest.fn(),
    showAll: false,
  };

  it('should render up arrow if showAll is provided', () => {
    const wrapper = mount(<ProjectListMoreItem {...defaultProps} showAll />);
    expect(wrapper.find(ArrowDropUpIcon)).toHaveLength(1);
  });

  it('should render down arrow if showAll is false', () => {
    const wrapper = mount(<ProjectListMoreItem {...defaultProps} />);
    expect(wrapper.find(ArrowDropDownIcon)).toHaveLength(1);
  });
});
