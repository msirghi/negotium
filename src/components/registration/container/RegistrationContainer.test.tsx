import { mount } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import { RegistrationContainer } from './RegistrationContainer';
import { SnackbarProvider } from 'notistack';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {},
    push: mockPush,
  }),
}));

describe('Registration container', () => {
  const getComponent = () => {
    return (
      <SnackbarProvider>
        <RegistrationContainer />
      </SnackbarProvider>
    );
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(getComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should handle sign in click', () => {
    const wrapper = mount(getComponent());
    act(() => {
      wrapper.find('#sign-in-link').at(0).simulate('click');
    });
    expect(mockPush).toBeCalled();
  });
});
