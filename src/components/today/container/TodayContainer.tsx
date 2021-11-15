import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import DateUtils from '../../../common/utils/dateUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import { ITask } from '../../../common/types/tasks.types';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import { useSnackbar } from 'notistack';
import { TaskSkeleton } from '../../common/spinners/taskSkeleton/TaskSkeleton';
import {Nullable} from "../../../common/types/common.types";

export const TodayContainer = () => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const defaultDay = useRef(dayjs().toDate());
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const onMarkAsDone = async (taskId: ITask['id']) => {
    setTasks((prevState) => prevState.filter(({ id }) => id !== taskId));
    enqueueSnackbar('Task marked as done', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await TaskService.markTaskAsDone(taskId);
  };

  const onTaskAdd = async (title: string, date: Nullable<Date>) => {
    const task: Omit<ITask, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length
    );
    enqueueSnackbar('Task added', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    setTasks((prevState) => [...prevState, task as ITask]);
    await TaskService.createTask(task);
    await refetch();
  };

  if (isLoading || !data) {
    return <TaskSkeleton />;
  }

  return (
    <div>
      <TaskWrapper title={'Today'} upperHeaderTitle={'Today'}>
        {tasks
          .filter(
            ({ dueDate, completed }) =>
              DateUtils.isTodayDate(dueDate) && !completed
          )
          .map((task) => (
            <TaskItem key={task.id} task={task} markAsDone={onMarkAsDone} />
          ))}
        <TaskAddButton onTaskAdd={onTaskAdd} defaultDate={defaultDay.current} />
      </TaskWrapper>
    </div>
  );
};
