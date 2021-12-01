import renderer, { act } from 'react-test-renderer';
import { LoginFooter } from './LoginFooter';
import { mount } from 'enzyme';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {},
    push: mockPush,
  }),
}));

describe('Login footer', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<LoginFooter />);
    expect(tree).toMatchSnapshot();
  });

  it('should handle sign in click', () => {
    const wrapper = mount(<LoginFooter />);
    act(() => {
      wrapper.find('span').simulate('click');
    });
    expect(mockPush).toBeCalled();
  });
});
