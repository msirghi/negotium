import renderer, { act } from 'react-test-renderer';
import { DeleteProjectDialog } from './DeleteProjectDialog';
import { mount } from 'enzyme';
import { StandardDialog } from '../standard/StandardDialog';

describe('DeleteProjectDialog', () => {
  const defaultProps = {
    open: true,
    setOpen: jest.fn(),
    onSubmit: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call setOpen prop method on standard dialog action', () => {
    const wrapper = mount(<DeleteProjectDialog {...defaultProps} />);
    const dialog = wrapper.find(StandardDialog);
    act(() => {
      dialog.props().setOpen(true);
    });
    expect(defaultProps.setOpen).toBeCalled();
  });

  it('should call onSubmit prop method on standard dialog action', () => {
    const wrapper = mount(<DeleteProjectDialog {...defaultProps} />);
    const dialog = wrapper.find(StandardDialog);
    act(() => {
      dialog.props().onSubmit();
    });
    expect(defaultProps.onSubmit).toBeCalled();
  });
});
