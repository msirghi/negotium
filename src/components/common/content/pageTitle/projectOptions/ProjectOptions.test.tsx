import { projectsMock } from '../../../../../common/tests/mockData/projects-mock';
import { MockReduxProvider } from '../../../../../common/tests/TestUtils';
import { SnackbarProvider } from 'notistack';
import { ProjectOptions } from './ProjectOptions';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { IconButton, Menu } from '@mui/material';
import { act } from '@testing-library/react';
import ProjectService from '../../../../../services/ProjectService';
import { DeleteProjectDialog } from '../../../dialogs/projects/DeleteProjectDialog';

const mockProjects = [...projectsMock];

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: 'inbox',
    query: {
      id: mockProjects[0].id,
    },
    push: jest.fn(),
  }),
}));

describe('ProjectOptions', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };
  const reduxStore = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return (
      <MockReduxProvider reduxStore={reduxStore}>
        <SnackbarProvider>
          <ProjectOptions {...defaultProps} />
        </SnackbarProvider>
      </MockReduxProvider>
    );
  };

  it('should match the snapshot', () => {
    const tree = renderer.create(renderComponent());
    expect(tree).toMatchSnapshot();
  });

  it('should handle menu close', () => {
    const wrapper = mount(renderComponent());
    const menu = wrapper.find(Menu) as any;

    act(() => {
      menu.props().onClose();
    });
    wrapper.update();
    expect(menu.props().open).toBeFalsy();
  });

  it('should handle menu open', () => {
    const wrapper = mount(renderComponent());
    const icon = wrapper.find(IconButton).at(0);

    act(() => {
      icon.simulate('click');
    });
    wrapper.update();
    const menu = wrapper.find(Menu) as any;
    expect(menu.props().open).toBeTruthy();
  });

  it('should handle project delete', () => {
    const wrapper = mount(renderComponent());
    ProjectService.deleteProjectById = jest.fn();
    const dialog = wrapper.find(DeleteProjectDialog);

    act(() => {
      dialog.props().onSubmit();
    });
    expect(ProjectService.deleteProjectById).toBeCalled();
  });
});
