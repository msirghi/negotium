import { TasksMock } from '../../../../../../common/tests/mockData/tasks-mock';
import renderer from 'react-test-renderer';
import { SectionWrapper } from './SectionWrapper';
import { mount } from 'enzyme';
import { TaskAddButton } from '../taskAdd/TaskAddButton';
import { act } from '@testing-library/react';
import { AddSectionRow } from '../add/AddSectionRow';

describe('SectionWrapper', () => {
  const defaultProps = {
    sectionId: '1',
    title: 'Title',
    tasks: TasksMock,
    onSectionAdd: jest.fn(),
    onTaskAdd: jest.fn(),
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(<SectionWrapper {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should handle new task add', () => {
    const wrapper = mount(<SectionWrapper {...defaultProps} />);
    const addButton = wrapper.find(TaskAddButton);
    act(() => {
      addButton.props().onTaskAdd('title', null);
    });
    expect(defaultProps.onTaskAdd).toBeCalled();
  });

  it('should handle new section add', () => {
    const wrapper = mount(<SectionWrapper {...defaultProps} />);
    const addSectionRow = wrapper.find(AddSectionRow);

    act(() => {
      addSectionRow.props().onSectionSave('title', 1);
    });
    expect(defaultProps.onSectionAdd).toBeCalled();
  });
});