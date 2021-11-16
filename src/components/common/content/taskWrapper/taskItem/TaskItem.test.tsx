import { TasksMock } from '../../../../../common/tests/mockData/tasks-mock';
import renderer from 'react-test-renderer';
import { TaskItem } from './TaskItem';
import { mount } from 'enzyme';
import { Checkbox } from '@mui/material';
import { act } from '@testing-library/react';
import {Row} from "../../../utilities/row/Row";

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
    const tree = renderer.create(<TaskItem {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should mark task as done', () => {
    const wrapper = mount(<TaskItem {...defaultProps} />);
    const checkbox = wrapper.find(Checkbox);
    act(() => {
      // @ts-ignore
      checkbox.props().onChange({});
    });
    expect(defaultProps.markAsDone).toBeCalled();
  });

  it('should select a task', () => {
    const wrapper = mount(<TaskItem {...defaultProps} />);
    const row = wrapper.find(Row).at(0);
    act(() => {
      row.simulate('click');
    });
    expect(defaultProps.onTaskSelect).toBeCalled();
  });
});
