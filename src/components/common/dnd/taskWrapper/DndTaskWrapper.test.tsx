import { TasksMock } from '../../../../common/tests/mockData/tasks-mock';
import { mount } from 'enzyme';
import { DndTaskWrapper } from './DndTaskWrapper';
import { act } from 'react-test-renderer';
import TaskService from '../../../../services/TaskService';

describe('DndTaskWrapper', () => {
  const defaultProps = {
    tasks: TasksMock,
    updateTasks: jest.fn(),
  };

  const dragResult = {
    source: { index: 1 },
    destination: { index: 2 },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    TaskService.updateOrderNumbers = jest.fn();
  });

  it('should render children', () => {
    const wrapper = mount(
      <DndTaskWrapper {...defaultProps}>
        <div id={'content'} />
      </DndTaskWrapper>
    );
    expect(wrapper.find('#content')).toHaveLength(1);
  });

  it('should update the task order', () => {
    const wrapper = mount(
      <DndTaskWrapper {...defaultProps}>
        <div id={'content'} />
      </DndTaskWrapper>
    );
    const content = wrapper.find('#content') as any;
    act(() => {
      content.props().handleDragEnd(dragResult);
    });
    expect(TaskService.updateOrderNumbers).toBeCalled();
  });

  it('should not update the task order if source = destination', () => {
    const dragResult = {
      destination: { index: 1 },
      source: { index: 1 },
    };

    const wrapper = mount(
      <DndTaskWrapper {...defaultProps}>
        <div id={'content'} />
      </DndTaskWrapper>
    );
    const content = wrapper.find('#content') as any;
    act(() => {
      content.props().handleDragEnd(dragResult);
    });
    expect(TaskService.updateOrderNumbers).not.toBeCalled();
  });

  it('should not update the task order if destination is undefined', () => {
    const dragResult = {
      destination: undefined,
    };

    const wrapper = mount(
      <DndTaskWrapper {...defaultProps}>
        <div id={'content'} />
      </DndTaskWrapper>
    );
    const content = wrapper.find('#content') as any;
    act(() => {
      content.props().handleDragEnd(dragResult);
    });
    expect(TaskService.updateOrderNumbers).not.toBeCalled();
  });
});
