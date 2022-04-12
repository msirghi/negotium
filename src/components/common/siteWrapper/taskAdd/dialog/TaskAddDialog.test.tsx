import { MockReduxProvider } from '../../../../../common/tests/TestUtils';
import { reduxStoreMock } from '../../../../../common/tests/mockData/redux-store-mock';
import { SnackbarProvider } from 'notistack';
import { TaskAddDialog } from './TaskAddDialog';
import { mount } from 'enzyme';
import { Dialog } from '@mui/material';
import TaskService from '../../../../../services/TaskService';
import { TaskAddButton } from '../../../content/taskWrapper/section/taskAdd/TaskAddButton';
import { act } from '@testing-library/react';

describe('TaskAddDialog', () => {
  const defaultProps = {
    handleClose: jest.fn(),
    open: true,
  };

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStoreMock}>
        <SnackbarProvider>
          <TaskAddDialog {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  it('should render dialog', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should handle task add', () => {
    const wrapper = mount(renderComponent());
    jest.spyOn(TaskService, 'createTask').mockImplementation();
    const taskAddButton = wrapper.find(TaskAddButton);

    act(() => {
      taskAddButton.props().onTaskAdd('title', null);
    });
    expect(TaskService.createTask).toBeCalled();
  });

  it('should handle dialog close', () => {
    const wrapper = mount(renderComponent());
    jest.spyOn(TaskService, 'createTask').mockImplementation();
    const taskAddButton = wrapper.find(TaskAddButton);

    act(() => {
      taskAddButton.props().cancelCallback!();
    });
    expect(defaultProps.handleClose).toBeCalled();
  });
});
