import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import { TaskSectionContent } from './TaskSectionContent';
import { act, fireEvent, render } from '@testing-library/react';
import TaskService from '../../../../../services/TaskService';

describe('TaskSectionContent', () => {
  const defaultProps = {
    task: TasksMock[0],
    onTaskUpdate: jest.fn(),
  };

  beforeEach(() => {
    TaskService.updateTaskName = jest.fn(() => Promise.resolve()) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle title change event', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<TaskSectionContent {...defaultProps} />);
    const titleInput = getByTestId('title-input');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'new value' } });
    });
    jest.runOnlyPendingTimers();
    expect(titleInput).toHaveValue('new value');
  });

  it('should call TaskService on title update', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<TaskSectionContent {...defaultProps} />);
    const titleInput = getByTestId('title-input');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'new value' } });
    });
    jest.runOnlyPendingTimers();
    expect(TaskService.updateTaskName).toBeCalled();
  });
});
