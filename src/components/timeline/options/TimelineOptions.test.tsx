import { shallow } from 'enzyme';
import { TimelineOptions } from './TimelineOptions';
import { Checkbox, IconButton } from '@mui/material';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TodayIcon from '@mui/icons-material/Today';
import { act } from '@testing-library/react';

describe('TimelineOptions', () => {
  const defaultProps = {
    onTaskAdd: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  it('should render task add button & icon button', () => {
    const wrapper = shallow(<TimelineOptions {...defaultProps} />);
    expect(wrapper.find(TaskAddButton)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(1);
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
