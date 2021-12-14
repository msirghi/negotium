import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import { TaskSectionContent } from './TaskSectionContent';
import { act, fireEvent, render } from '@testing-library/react';
import TaskService from '../../../../../services/TaskService';
import { mount } from 'enzyme';
import MentionInput from '../../../form/input/mention/MentionInput';
import TestUtils from '../../../../../common/tests/TestUtils';
import FeatureToggles from '../../../../../utilities/featureToggles/FeatureToggles';

describe('TaskSectionContent', () => {
  const defaultProps = {
    task: TasksMock[0],
    onTaskUpdate: jest.fn(),
  };

  beforeEach(() => {
    FeatureToggles.isFeatureEnabled = jest.fn(() => true);
    TaskService.updateTaskName = jest.fn(() => Promise.resolve()) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle title change event', () => {
    const wrapper = mount(<TaskSectionContent {...defaultProps} />);
    const titleInput = wrapper.find(MentionInput).at(0);

    act(() => {
      titleInput.props().onChange(JSON.parse(TestUtils.testData.fakeTitle));
    });
    expect(titleInput.props().defaultValue).toBeUndefined();
  });

  it('should call TaskService on title update', () => {
    jest.useFakeTimers();
    const wrapper = mount(<TaskSectionContent {...defaultProps} />);
    const titleInput = wrapper.find(MentionInput).at(0);

    act(() => {
      titleInput.props().onChange(JSON.parse(TestUtils.testData.fakeTitle));
    });

    jest.runOnlyPendingTimers();
    expect(TaskService.updateTaskName).toBeCalled();
  });

  it('should handle title change event on feature toggle off', () => {
    FeatureToggles.isFeatureEnabled = jest.fn(() => false);
    jest.useFakeTimers();
    const { getByTestId } = render(<TaskSectionContent {...defaultProps} />);
    const titleInput = getByTestId('title-input');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'new value' } });
    });
    jest.runOnlyPendingTimers();
    expect(titleInput).toHaveValue('new value');
  });
});
