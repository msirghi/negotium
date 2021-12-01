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
  it('should match the snapshot', () => {
    const tree = renderer.create(
      <SnackbarProvider>
        <RegistrationContainer />
      </SnackbarProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should handle sign in click', () => {
    const wrapper = mount(
      <SnackbarProvider>
        <RegistrationContainer />
      </SnackbarProvider>
    );
    act(() => {
      wrapper.find('#sign-in-link').at(0).simulate('click');
    });
    expect(mockPush).toBeCalled();
  });
});
