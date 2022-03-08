import { act, render, waitFor } from '@testing-library/react';
import { SiteWrapperProjectsList } from './SiteWrapperProjectsList';
import { projectsRequests } from '../../../../../common/requests/projectsRequests';
import { projectsMock } from '../../../../../common/tests/mockData/projects-mock';
import { MockThemeProvider } from '../../../../../common/tests/TestUtils';
import ProjectService from '../../../../../services/ProjectService';
import { mount } from 'enzyme';
import { ProjectDialog } from '../wrapper/projectDialog/ProjectDialog';
import { SiteWrapperList } from '../wrapper/SiteWrapperList';
import { ListItem } from '@mui/material';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import { store } from '../../../../../redux/store';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SiteWrapperProjectsList', () => {
  beforeEach(() => {
    jest.spyOn(mockRouter, 'push');
    jest.spyOn(ProjectService, 'getProjects').mockImplementation(() => Promise.resolve([...projectsMock]));
    jest.clearAllMocks();
  });

  const renderComponent = () => (
    <Provider store={store}>
      <MockThemeProvider>
        <SiteWrapperProjectsList />
      </MockThemeProvider>
    </Provider>
  );

  it('should render project list', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() => Promise.resolve([...projectsMock]));

    const { getByTestId } = render(renderComponent());

    await waitFor(() => {
      expect(getByTestId('projects-list')).toBeInTheDocument();
    });
  });

  it('should add a new project', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() => Promise.resolve([...projectsMock]));
    ProjectService.addProject = jest.fn(() => Promise.resolve()) as any;

    const wrapper = mount(renderComponent());

    const dialog = wrapper.find(ProjectDialog);
    act(() => {
      dialog.props().onSubmit('new', '#ffffff');
    });
    expect(ProjectService.addProject).toBeCalled();
  });

  it('should handle project item click', async () => {
    jest.useFakeTimers();
    projectsRequests.fetchProjects = jest.fn(() => Promise.resolve([...projectsMock]));

    const wrapper = mount(renderComponent());
    const item = wrapper.find(ListItem).at(0);
    act(() => {
      item.simulate('click');
    });
    expect(mockRouter.push).toBeCalled();
  });

  it('should handle dialog open', async () => {
    jest.useFakeTimers();
    jest.spyOn(ProjectService, 'getProjects').mockImplementation(() => Promise.resolve([...projectsMock]));
    ProjectService.addProject = jest.fn(() => Promise.resolve()) as any;

    const wrapper = mount(renderComponent());
    wrapper.update();

    const wrapperList = wrapper.find(SiteWrapperList);
    act(() => {
      wrapperList.props().options?.addOptions?.onClick();
    });
    wrapper.update();

    expect(wrapper.find(ProjectDialog).props().open).toBeTruthy();
  });
});
