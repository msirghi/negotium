import { EditForm } from './EditForm';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';
import MentionInput from '../../../../../form/input/mention/MentionInput';
import TestUtils from '../../../../../../../common/tests/TestUtils';
import FeatureToggles from '../../../../../../../utilities/featureToggles/FeatureToggles';
import { TextField } from '@mui/material';
import StringUtils from "../../../../../../../common/utils/stringUtils";

describe('EditForm', () => {
  const defaultProps = {
    fieldValue: TestUtils.testData.fakeTitle,
    setFieldValue: jest.fn(),
    onDateSelect: jest.fn(),
  };

  beforeEach(() => {
    FeatureToggles.isFeatureEnabled = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call prop method on input change', () => {
    const wrapper = mount(<EditForm {...defaultProps} />);
    const input = wrapper.find(TextField) as any;

    act(() => {
      input.props().onChange({ target: { value: 'value' } });
    });
    expect(defaultProps.setFieldValue).toBeCalled();
  });

  it('should call prop method if input value contains date', () => {
    StringUtils.getTaskInputDateByKeywords = jest.fn(() => ({date: 'date', value: 'value'}))
    const wrapper = mount(<EditForm {...defaultProps} />);
    const input = wrapper.find(TextField) as any;

    act(() => {
      input.props().onChange({ target: { value: 'value' } });
    });
    expect(defaultProps.onDateSelect).toBeCalled();
  });

  it('should call prop method on date select', () => {
    const wrapper = mount(<EditForm {...defaultProps} />);
    const dialog = wrapper.find(ScheduleDialog);
    act(() => {
      dialog.props().onDateSelect(null);
    });
    expect(defaultProps.onDateSelect).toBeCalled();
  });
});
