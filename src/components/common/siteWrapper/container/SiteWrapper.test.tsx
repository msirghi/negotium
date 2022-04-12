import { SiteWrapper } from './SiteWrapper';
import { projectsRequests } from '../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../common/tests/mockData/projects-mock';
import { mount } from 'enzyme';
import TestUtils, { MockReduxProvider } from '../../../../common/tests/TestUtils';
import AuthService from '../../../../services/AuthService';
import { reduxStoreMock } from '../../../../common/tests/mockData/redux-store-mock';
import AccountService from '../../../../services/AccountService';
import ThemeUtils from '../../../../common/utils/themeUtils';
import taskActions from '../../../../redux/actions/loadTasks';
import notesActions from '../../../../redux/actions/loadNotes';
import { SnackbarProvider } from 'notistack';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SiteWrapper', () => {
  const reduxStore = { ...reduxStoreMock };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // @ts-ignore
    jest.spyOn(taskActions, 'loadTasks').mockReturnValue({ type: '', payload: {} });
    // @ts-ignore
    jest.spyOn(notesActions, 'loadNotes').mockReturnValue({ type: '', payload: {} });
    AccountService.getUserMetadata = jest.fn(() => Promise.resolve({ data: { theme: 'noir' } })) as any;
    projectsRequests.fetchProjects = jest.fn(() => Promise.resolve([...projectsMock]));
    AuthService.getUserInfo = jest.fn(() => Promise.resolve() as any);
  });

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <SiteWrapper>
            <div id={'content'} />
          </SiteWrapper>
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  it('should render children', () => {
    const wrapper = mount(renderComponent());
    expect(wrapper.find('#content')).toHaveLength(1);
  });

  it('should handle drawer status on open drawer button click', () => {
    window.matchMedia = TestUtils.createMatchMedia(500) as any;
    const wrapper = mount(renderComponent());
    wrapper.update();
    const button = wrapper.find('#menu-icon').at(0);
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find('#drawer').at(0).props().open).toBeTruthy();
  });

  it('should get user info on mount', () => {
    mount(renderComponent());
    expect(AuthService.getUserInfo).toBeCalled();
  });

  it('should fetch user metadata on mount', () => {
    mount(renderComponent());
    expect(AccountService.getUserMetadata).toBeCalled();
  });

  it('should validate fetched theme', async () => {
    ThemeUtils.isValidTheme = jest.fn(() => false);
    await mount(renderComponent());
    expect(ThemeUtils.isValidTheme).toBeCalled();
  });
});
