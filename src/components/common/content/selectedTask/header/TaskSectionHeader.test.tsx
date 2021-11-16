import renderer from 'react-test-renderer';
import { TaskSectionHeader } from './TaskSectionHeader';
import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { ScheduleDialog } from '../../taskWrapper/section/taskAdd/scheduleDialog/ScheduleDialog';
import { act } from '@testing-library/react';
import TaskService from '../../../../../services/TaskService';
import DateUtils from '../../../../../common/utils/dateUtils';

describe('TaskSectionHeader', () => {
  const defaultProps = {
    onTaskDateUpdate: jest.fn(),
    task: TasksMock[0],
  };

  beforeAll(() => {
    TaskService.updateTaskDueDate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(<TaskSectionHeader {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match the snapshot with date not in the past', () => {
    DateUtils.isDateInThePast = jest.fn(() => false);
    const tree = renderer.create(<TaskSectionHeader {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should handle date update by calling prop method', () => {
    const wrapper = mount(<TaskSectionHeader {...defaultProps} />);
    const dialog = wrapper.find(ScheduleDialog);
    act(() => {
      dialog.props().onDateSelect(null);
    });
    expect(defaultProps.onTaskDateUpdate).toBeCalled();
  });
});
