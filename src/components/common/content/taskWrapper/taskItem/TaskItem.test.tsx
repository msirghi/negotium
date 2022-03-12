import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import renderer from 'react-test-renderer';
import { TaskItem } from './TaskItem';
import { mount } from 'enzyme';
import { Checkbox } from '@mui/material';
import { act } from '@testing-library/react';
import { MockDndProvider, MockReduxProvider } from '../../../../../common/tests/TestUtils';

describe('TaskItem', () => {
  const defaultProps = {
    task: TasksMock[0],
    markAsDone: jest.fn(),
    onTaskSelect: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(
      <MockDndProvider>
        <MockReduxProvider reduxStore={{ account: {} }}>
          <TaskItem {...defaultProps} />
        </MockReduxProvider>
      </MockDndProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should mark task as done', () => {
    const wrapper = mount(
      <MockDndProvider>
        <MockReduxProvider reduxStore={{ account: {} }}>
          <TaskItem {...defaultProps} />
        </MockReduxProvider>
      </MockDndProvider>
    );
    const checkbox = wrapper.find(Checkbox);
    act(() => {
      // @ts-ignore
      checkbox.props().onChange({});
    });
    expect(defaultProps.markAsDone).toBeCalled();
  });

  it('should select a task', () => {
    const wrapper = mount(
      <MockDndProvider>
        <MockReduxProvider reduxStore={{ account: {} }}>
          <TaskItem {...defaultProps} />
        </MockReduxProvider>
      </MockDndProvider>
    );
    const row = wrapper.find('div').at(1);
    act(() => {
      row.simulate('click');
    });
    expect(defaultProps.onTaskSelect).toBeCalled();
  });
});
