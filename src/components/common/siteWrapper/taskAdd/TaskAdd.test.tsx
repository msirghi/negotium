import { TaskAdd } from './TaskAdd';
import { MockReduxProvider } from '../../../../common/tests/TestUtils';
import { reduxStoreMock } from '../../../../common/tests/mockData/redux-store-mock';
import { mount } from 'enzyme';
import { Dialog, IconButton } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { act } from 'react-test-renderer';
import { TaskAddDialog } from './dialog/TaskAddDialog';

describe('TaskAdd', () => {
  afterEach(jest.clearAllMocks);

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStoreMock}>
        <SnackbarProvider>
          <TaskAdd />
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  it('should render icon button and dialog', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should open the dialog on icon button click', () => {
    const wrapper = mount(renderComponent());
    const iconButton = wrapper.find(IconButton);

    act(() => {
      iconButton.simulate('click');
    });
    expect(wrapper.find(Dialog).props().open).toBeTruthy();
  });

  it('should close the dialog on cancel click', () => {
    const wrapper = mount(renderComponent());
    const iconButton = wrapper.find(IconButton);
    const dialog = wrapper.find(TaskAddDialog);

    act(() => {
      iconButton.simulate('click');
      dialog.props().handleClose();
    });
    expect(wrapper.find(Dialog).props().open).toBeFalsy();
  });
});
