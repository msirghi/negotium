import { projectsMock } from '../../../common/tests/mockData/projects-mock';
import { ProjectDialogWrapper } from './ProjectDialogWrapper';
import { mount } from 'enzyme';
import { MockReduxProvider } from '../../../common/tests/TestUtils';
import { ProjectDialog } from '../../common/siteWrapper/lists/wrapper/projectDialog/ProjectDialog';
import ProjectService from '../../../services/ProjectService';

describe('ProjectDialogWrapper', () => {
  const defaultProps = {
    project: projectsMock[0],
    open: true,
    setOpen: jest.fn(),
  };

  const reduxStore = {
    projects: {
      projects: projectsMock,
    },
  };

  beforeEach(() => {
    jest.spyOn(ProjectService, 'updateProjectName').mockImplementation();
    jest.spyOn(ProjectService, 'updateProjectColor').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <ProjectDialogWrapper {...defaultProps} />
      </MockReduxProvider>
    );
    expect(wrapper.find(ProjectDialog)).toHaveLength(1);
  });

  it('should handle project update', async () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <ProjectDialogWrapper {...defaultProps} />
      </MockReduxProvider>
    );

    const dialog = wrapper.find(ProjectDialog);
    await dialog.props().onSubmit('title', 'color');
    expect(ProjectService.updateProjectName).toBeCalled();
  });

  it('should handle project color update', async () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <ProjectDialogWrapper {...defaultProps} />
      </MockReduxProvider>
    );

    const dialog = wrapper.find(ProjectDialog);
    await dialog.props().onSubmit('title', 'color');
    expect(ProjectService.updateProjectColor).toBeCalled();
  });
});
