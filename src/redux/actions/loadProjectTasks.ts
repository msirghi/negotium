import ProjectService from '../../services/ProjectService';
import { setProjectTasks } from '../tasks/tasksSlice';

export const loadProjectTasks = () => {
  return (dispatch: Function) => {
    return ProjectService.getAllProjectTasks().then((res: any) => {
      dispatch(setProjectTasks(res));
    });
  };
};

const projectTasksActions = {
  loadProjectTasks,
};

export default projectTasksActions;
