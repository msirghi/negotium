import { Nullable } from '../../types/common.types';
import TaskUtils from '../../../components/common/utilities/taskUtils/TaskUtils';
import { Task } from '../../types/tasks.types';
import { addTaskToList, markTaskAsDone, setTasksList } from '../../../redux/tasks/tasksSlice';
import TaskService from '../../../services/TaskService';
import taskActions from '../../../redux/actions/loadTasks';
import { useDispatch, useSelector } from 'react-redux';
import { tasksSelector } from '../../../redux/selectors/tasks.selectors';
import {useSnackbar} from "notistack";
import useTranslation from "next-translate/useTranslation";

export const useTasksActions = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('common');

  const handleTaskAdd = async (title: string, date: Nullable<Date>) => {
    const orderNumber = TaskUtils.getMaxTaskOrderNumber(tasks) + 1;
    const newTask: Omit<Task, 'id'> = TaskUtils.getNewTaskObject(title, date, orderNumber);
    dispatch(addTaskToList(newTask));
    await TaskService.createTask(newTask);
    enqueueSnackbar(t('snackbarTitles.taskAdded'))
    dispatch(taskActions.loadTasks());
  };

  const handleMarkTaskAsDone = async (taskId: Task['id']) => {
    const task = tasks.find((t) => t.id === taskId);
    await TaskUtils.markAsDone(taskId, !task?.completed);
    enqueueSnackbar(t('snackbarTitles.taskMarkedAsDone'))
    dispatch(markTaskAsDone(taskId));
  };

  const handleTaskUpdate = (updatedTask: Task, callback: (tasks: Task[]) => void) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) => (task.id === id ? updatedTask : task));
    dispatch(setTasksList([...updatedTasks]));
    callback(updatedTasks);
  };

  return { handleTaskAdd, handleMarkTaskAsDone, handleTaskUpdate };
};