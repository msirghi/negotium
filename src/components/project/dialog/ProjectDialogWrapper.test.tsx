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

  it('should render dialog', () => {
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <ProjectDialogWrapper {...defaultProps} />
      </MockReduxProvider>
    );
    expect(wrapper.find(ProjectDialog)).toHaveLength(1);
  });

  it('should handle project update', () => {
    ProjectService.updateProjectName = jest.fn();
    const wrapper = mount(
      <MockReduxProvider reduxStore={reduxStore}>
        <ProjectDialogWrapper {...defaultProps} />
      </MockReduxProvider>
    );

    const dialog = wrapper.find(ProjectDialog);
    dialog.props().onSubmit('title');
    expect(ProjectService.updateProjectName).toBeCalled();
  });
});
