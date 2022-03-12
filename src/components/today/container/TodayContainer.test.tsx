import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TasksMock } from '../../../common/tests/mockData/tasks-mock';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { TodayContainer } from './TodayContainer';
import { mount } from 'enzyme';
import DateUtils from '../../../common/utils/dateUtils';
import { InboxContainer } from '../../inbox';

require('setimmediate');

describe('TodayContainer', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    tasksRequests.fetchTasks = jest.fn(() => Promise.resolve([...TasksMock]));
    DateUtils.isTodayDate = jest.fn(() => true);
  });

  const reduxStore = { tasks: { tasks: TasksMock } };

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <TodayContainer />
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render container with tasks', () => {
    const wrapper = mount(renderComponent());
    const container = wrapper.find(InboxContainer);
    expect(container.props().predefinedTasks).toBeDefined();
  });
});
