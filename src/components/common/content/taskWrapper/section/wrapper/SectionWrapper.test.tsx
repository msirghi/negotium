import { TasksMock } from '../../../../../../common/tests/mockData/tasks-mock';
import renderer from 'react-test-renderer';
import { SectionWrapper } from './SectionWrapper';
import { mount } from 'enzyme';
import { TaskAddButton } from '../taskAdd/TaskAddButton';
import { act } from '@testing-library/react';
import { MockDndProvider, MockReduxProvider } from '../../../../../../common/tests/TestUtils';
import { TaskItem } from '../../taskItem/TaskItem';
import { EditableTitle } from '../../../pageTitle/editableTitle/EditableTitle';

describe('SectionWrapper', () => {
  const defaultProps = {
    sectionId: '1',
    title: 'Title',
    tasks: TasksMock,
    onSectionAdd: jest.fn(),
    onTaskAdd: jest.fn(),
    markAsDone: jest.fn(),
    onTaskSelect: jest.fn(),
    onSectionUpdate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return (
      <MockDndProvider>
        <MockReduxProvider reduxStore={{ account: {} }}>
          <SectionWrapper {...defaultProps} />
        </MockReduxProvider>
      </MockDndProvider>
    );
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should handle new task add', () => {
    const wrapper = mount(renderComponent());
    const addButton = wrapper.find(TaskAddButton);
    act(() => {
      addButton.props().onTaskAdd('title', null);
    });
    expect(defaultProps.onTaskAdd).toBeCalled();
  });

  it('should handle task select', () => {
    const wrapper = mount(renderComponent());
    const taskItem = wrapper.find(TaskItem).at(0);
    act(() => {
      taskItem.props().onTaskSelect(TasksMock[0]);
    });
    expect(defaultProps.onTaskSelect).toBeCalled();
  });

  it('should handle task update [mark as done]', () => {
    const wrapper = mount(renderComponent());
    const taskItem = wrapper.find(TaskItem).at(0);
    act(() => {
      taskItem.props().markAsDone(TasksMock[0].id);
    });
    expect(defaultProps.markAsDone).toBeCalled();
  });

  it('should handle section title update', () => {
    const wrapper = mount(renderComponent());
    const editableTitle = wrapper.find(EditableTitle).at(0);
    act(() => {
      editableTitle.props().editableOptions.onSave!('new');
    });
    expect(defaultProps.onSectionUpdate).toBeCalled();
  });
});
