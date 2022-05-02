import { shallow } from 'enzyme';
import { TimelineOptions } from './TimelineOptions';
import { Checkbox, IconButton } from '@mui/material';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TodayIcon from '@mui/icons-material/Today';
import { act } from '@testing-library/react';
import { TimelineView } from '../../../common/constants/enums';

describe('TimelineOptions', () => {
  const defaultProps = {
    onTaskAdd: jest.fn(),
    onViewSwitch: jest.fn(),
    currentView: TimelineView.DEFAULT,
  };

  afterEach(jest.clearAllMocks);

  it('should render task add button & icon button', () => {
    const wrapper = shallow(<TimelineOptions {...defaultProps} />);
    expect(wrapper.find(TaskAddButton)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(2);
  });

  it('should handle change view button click', () => {
    const wrapper = shallow(<TimelineOptions {...defaultProps} />);
    const button = wrapper.find('#change-view-btn');
    button.simulate('click');
    expect(defaultProps.onViewSwitch).toBeCalled();
  });

  it('should render disabled checkbox if current view is LIST', () => {
    const wrapper = shallow(<TimelineOptions {...defaultProps} currentView={TimelineView.LIST} />);
    const checkbox = wrapper.find(Checkbox);
    expect(checkbox.props().disabled).toBeTruthy();
  });

  it('should render enabled checkbox if current view is not LIST', () => {
    const wrapper = shallow(<TimelineOptions {...defaultProps} currentView={TimelineView.DEFAULT} />);
    const checkbox = wrapper.find(Checkbox);
    expect(checkbox.props().disabled).toBeFalsy();
  });

  it('should scroll to the today section', () => {
    const scrollIntoViewSpy = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue({ scrollIntoView: scrollIntoViewSpy } as any);
    const wrapper = shallow(<TimelineOptions {...defaultProps} />);
    const todayIcon = wrapper.find(TodayIcon);

    act(() => {
      todayIcon.simulate('click');
    });
    expect(scrollIntoViewSpy).toBeCalled();
  });

  it('should handle checkbox click status change', () => {
    const wrapper = shallow(<TimelineOptions {...defaultProps} />);
    const checkbox = wrapper.find(Checkbox);

    act(() => {
      checkbox.simulate('change');
    });
    wrapper.update();
    expect(wrapper.find(Checkbox).props().checked).toBeFalsy();
  });
});
