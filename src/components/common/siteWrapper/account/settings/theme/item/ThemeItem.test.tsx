import renderer, { act } from 'react-test-renderer';
import { ThemeItem } from './ThemeItem';
import { mount } from 'enzyme';
import CheckIcon from '@mui/icons-material/Check';

describe('ThemeItem', () => {
  const defaultProps = {
    theme: {
      label: 'red',
      color: 'red',
      internalKey: 'red',
    },
    selected: false,
    onClick: jest.fn(),
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(<ThemeItem {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render check icon if selected prop is provided', () => {
    const wrapper = mount(<ThemeItem {...defaultProps} selected />);
    expect(wrapper.find(CheckIcon)).toHaveLength(1);
  });

  it('should fire prop method on click', () => {
    const wrapper = mount(<ThemeItem {...defaultProps} />);
    const container = wrapper.find('#theme-red');

    act(() => {
      container.simulate('click');
    });
    expect(defaultProps.onClick).toBeCalled();
  });
});
