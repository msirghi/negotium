import { FC } from 'react';
import { ProjectDialog } from '../../common/siteWrapper/lists/wrapper/projectDialog/ProjectDialog';
import { IProject } from '../../../common/types/projects.types';
import ProjectService from '../../../services/ProjectService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setProjectsList } from '../../../redux/projects/projectsSlice';

type Props = {
  project: IProject;
  open: boolean;
  setOpen: (val: boolean) => void;
};

export const ProjectDialogWrapper: FC<Props> = ({ project, open, setOpen }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  const onSubmit = async (title: string) => {
    await ProjectService.updateProjectName(project.id, title);
    const updatedProject = { ...project, name: title };
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? updatedProject : p
    );
    dispatch(setProjectsList(updatedProjects));
  };

  return (
    <ProjectDialog
      selectedProject={project}
      dialogTitle={'Edit Project'}
      onSubmit={onSubmit}
      open={open}
      setOpen={setOpen}
      submitButtonTitle={'Edit'}
    />
  );
};
