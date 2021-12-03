import { EditForm } from './EditForm';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { ScheduleDialog } from '../scheduleDialog/ScheduleDialog';
import MentionInput from '../../../../../form/input/mention/MentionInput';
import TestUtils from '../../../../../../../common/tests/TestUtils';
import FeatureToggles from '../../../../../../../utilities/featureToggles/FeatureToggles';

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
    const input = wrapper.find(MentionInput);

    act(() => {
      input.props().onChange([]);
    });
    expect(defaultProps.setFieldValue).toBeCalled();
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
