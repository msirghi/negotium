import { setTasksList } from '../tasks/tasksSlice';
import { tasksRequests } from '../../common/requests/tasksRequests';

export const loadTasks = () => {
  return (dispatch: Function) => {
    return tasksRequests.fetchTasks().then((res) => {
      dispatch(setTasksList(res));
    });
  };
};

const taskActions = {
  loadTasks,
};

export default taskActions;
