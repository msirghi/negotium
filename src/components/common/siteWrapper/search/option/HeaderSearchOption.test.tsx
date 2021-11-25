import CloseIcon from '@mui/icons-material/Close';
import renderer, { act } from 'react-test-renderer';
import { HeaderSearchOption } from './HeaderSearchOption';
import { mount } from 'enzyme';
import { Box } from '@mui/system';

describe('HeaderSearchOption', () => {
  const defaultProps = {
    props: {} as any,
    option: {
      id: '1',
      Icon: CloseIcon,
      title: 'Title',
      onClick: jest.fn(),
    },
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(<HeaderSearchOption {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should return a div if the title is not provided', () => {
    const wrapper = mount(
      <HeaderSearchOption
        {...defaultProps}
        // @ts-ignore
        option={{ ...defaultProps.option, title: undefined }}
      />
    );

    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should call prop method on box click', () => {
    const wrapper = mount(<HeaderSearchOption {...defaultProps} />);
    const box = wrapper.find(Box);
    act(() => {
      box.simulate('click');
    });
    expect(defaultProps.option.onClick).toBeCalled();
  });
});
