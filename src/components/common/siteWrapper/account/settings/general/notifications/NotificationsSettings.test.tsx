import { MockReduxProvider } from '../../../../../../../common/tests/TestUtils';
import { NotificationsSettings } from './NotificationsSettings';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {mount} from "enzyme";

describe('NotificationsSettings', () => {
  afterEach(jest.clearAllMocks);

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={{ account: { notificationsEnabled: true } }}>
        <NotificationsSettings />
      </MockReduxProvider>
    );
  };

  it('should render button section', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find(ToggleButtonGroup)).toHaveLength(1);
  });
});
