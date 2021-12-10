import { accountInfoMock } from '../../../../../../common/tests/mockData/account-mock';
import renderer from 'react-test-renderer';
import TestUtils, {
  MockReduxProvider,
} from '../../../../../../common/tests/TestUtils';
import { AccountSettings } from './AccountSettings';
import { mount } from 'enzyme';
import { TextField } from '@mui/material';

describe('AccountSettings', () => {
  const defaultProps = {};
  const reduxState = {
    account: {
      info: accountInfoMock,
    },
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render input with the default value', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    const nameField = wrapper.find('#name-field').at(0);
    expect(nameField.props().value).toEqual(accountInfoMock.name);
  });

  it('should render full width field on mobile', () => {
    window.matchMedia = TestUtils.createMatchMedia(600) as any;
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxState}>
        <AccountSettings {...defaultProps} />
      </MockReduxProvider>
    );
    expect(wrapper.find(TextField).at(0).props().fullWidth).toBeTruthy();
  });
});
