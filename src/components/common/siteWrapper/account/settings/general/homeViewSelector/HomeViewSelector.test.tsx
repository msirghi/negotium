import * as useMetadataActions from '../hooks/useMetadataActions';
import { DefaultHomePage } from '../../../../../../../common/constants/enums';
import { shallow } from 'enzyme';
import { HomeViewSelector } from './HomeviewSelector';
import { TextField } from '@mui/material';
import { act } from '@testing-library/react';

describe('HomeViewSelector', () => {
  const defaultProps = {
    className: 'class',
  };
  const updateMock = jest.fn();
  const hookMock = {
    defaultView: DefaultHomePage.INBOX,
    updateDefaultHomeView: updateMock,
    loading: false,
    routeToHomePage: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(useMetadataActions, 'useMetadataActions').mockReturnValue({
      ...hookMock,
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  it('should render select TextField', () => {
    const wrapper = shallow(<HomeViewSelector {...defaultProps} />);
    const textField = wrapper.find(TextField);

    expect(textField.props().select).toBeTruthy();
  });

  it('should render disabled selector if loading flag is true', () => {
    jest.spyOn(useMetadataActions, 'useMetadataActions').mockReturnValue({
      ...hookMock,
      loading: true,
    });
    const wrapper = shallow(<HomeViewSelector {...defaultProps} />);
    const textField = wrapper.find(TextField);

    expect(textField.props().disabled).toBeTruthy();
  });

  it('should update default home view on selector change', () => {
     const wrapper = shallow(<HomeViewSelector {...defaultProps} />);
    const textField = wrapper.find(TextField) as any;

    act(() => {
      textField.props().onChange({ target: { value: DefaultHomePage.TODAY } });
    });
    expect(updateMock).toBeCalledWith(DefaultHomePage.TODAY);
  });
});
