import renderer from 'react-test-renderer';
import { TaskWrapper } from './TaskWrapper';
import { mount } from 'enzyme';
import { AddSectionRow } from '../section/add/AddSectionRow';
import { act } from '@testing-library/react';

describe('TaskWrapper', () => {
  const defaultProps = {
    title: 'Title',
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(
      <TaskWrapper {...defaultProps}>
        <div />
      </TaskWrapper>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should show the add section button if prop is provided', () => {
    const wrapper = mount(
      <TaskWrapper {...defaultProps} showSections>
        <div />
      </TaskWrapper>
    );
    expect(wrapper.find(AddSectionRow)).toHaveLength(1);
  });

  it('should not call prop method on task section click if handler is not provided', () => {
    const wrapper = mount(
      <TaskWrapper {...defaultProps} showSections>
        <div />
      </TaskWrapper>
    );
    const row = wrapper.find(AddSectionRow);

    act(() => {
      row.simulate('click');
    });
    expect(row.props().onSectionSave).toBeDefined();
  });

  it('should call prop method on task section click if handler is provided', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <TaskWrapper {...defaultProps} showSections onSectionAdd={spy}>
        <div />
      </TaskWrapper>
    );
    const row = wrapper.find(AddSectionRow);

    act(() => {
      row.props().onSectionSave('title', 1);
    });
    expect(spy).toBeCalled();
  });
});
