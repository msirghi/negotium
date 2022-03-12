import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { useEffect, useState } from 'react';
import { Task } from '../../../common/types/tasks.types';
import { TaskWrapper } from '../../common/content/taskWrapper';
import DateUtils from '../../../common/utils/dateUtils';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import TaskService from '../../../services/TaskService';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { useSnackbar } from 'notistack';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import SortUtils from '../../../common/utils/sortUtils';
import { TaskSkeleton } from '../../common/skeletons/taskSkeleton/TaskSkeleton';
import {Nullable} from "../../../common/types/common.types";
import {ContentBox} from "../../common/boxes/content/ContentBox";

export const UpcomingContainer = () => {
  const { isLoading, data, refetch } = useFetchTasks();
  const { enqueueSnackbar } = useSnackbar();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        ({ dueDate, completed }) =>
          !DateUtils.isTodayDate(dueDate!) &&
          DateUtils.getDateDifference(dueDate!) < 1 &&
          !completed
      );
      setTasks(filtered);
    }
  }, [data]);

  const markAsDone = async (taskId: Task['id']) => {
    enqueueSnackbar('Task marked as done', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await TaskUtils.markAsDone(taskId);
  };

  const onAddTask = async (title: string, date: Nullable<Date>) => {
    const newTask = TaskUtils.getNewTaskObject(title, date, tasks.length - 1);
    setTasks((prevState) => [...prevState, newTask as Task]);
    enqueueSnackbar('Task added', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await TaskService.createTask(newTask);
    await refetch();
  };

  if (isLoading || !data) {
    return <TaskSkeleton />;
  }

  return (
    <ContentBox>
      <TaskWrapper title={'Upcoming'} upperHeaderTitle={'Upcoming'}>
        {SortUtils.sortByDate(tasks).map((task) => (
          <TaskItem key={task.id} task={task} markAsDone={markAsDone} onTaskSelect={() => {}} />
        ))}
        <TaskAddButton onTaskAdd={onAddTask} />
      </TaskWrapper>
    </ContentBox>
  );
};
