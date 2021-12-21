import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import { TaskSectionContent } from './TaskSectionContent';
import { act, fireEvent, render } from '@testing-library/react';
import TaskService from '../../../../../services/TaskService';
import { mount } from 'enzyme';
import MentionInput from '../../../form/input/mention/MentionInput';
import TestUtils from '../../../../../common/tests/TestUtils';
import FeatureToggles from '../../../../../utilities/featureToggles/FeatureToggles';
import ProjectService from "../../../../../services/ProjectService";
import RichTextField from "../../../form/input/richText/RichTextField";
import {initialRichTextValue} from "../../../../../common/constants/constants";

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

  it('should handle project task description update', () => {
    FeatureToggles.isFeatureEnabled = jest.fn(() => false);
    ProjectService.updateProjectTaskDescription = jest.fn(() => Promise.resolve()) as any;
    jest.useFakeTimers();
    const wrapper = mount(
      <TaskSectionContent {...defaultProps} task={{ ...defaultProps.task, projectId: '1' }} />
    );
    const descriptionField = wrapper.find(RichTextField).at(0);

    act(() => {
      descriptionField.props().setValue(initialRichTextValue);
    });
    jest.runAllTimers();
    expect(ProjectService.updateProjectTaskDescription).toBeCalled();
  });

  it('should handle simple task description update', () => {
    FeatureToggles.isFeatureEnabled = jest.fn(() => false);
    TaskService.updateTaskDescription = jest.fn(() => Promise.resolve()) as any;
    jest.useFakeTimers();
    const wrapper = mount(
        <TaskSectionContent {...defaultProps} task={{ ...defaultProps.task, projectId: undefined }} />
    );
    const descriptionField = wrapper.find(RichTextField).at(0);

    act(() => {
      descriptionField.props().setValue(initialRichTextValue);
    });
    jest.runAllTimers();
    expect(TaskService.updateTaskDescription).toBeCalled();
  });
});
