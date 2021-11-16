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
import { TaskSkeleton } from '../../common/skeletons/taskSkeleton/TaskSkeleton';
import { Nullable } from '../../../common/types/common.types';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { Row } from '../../common/utilities/row/Row';
import { SelectedTaskSection } from '../../common/content/selectedTask';

export const TodayContainer = () => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const defaultDay = useRef(dayjs().toDate());
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

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

  const updateTaskHandler = (updatedTask: ITask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks([...updatedTasks]);
  };

  const onTaskSelect = (task: ITask) => {
    setSelectedTask(task);
  };

  const deselectTask = () => setSelectedTask(null);

  if (isLoading || !data) {
    return <TaskSkeleton />;
  }

  return (
    <Row fullWidth>
      <ContentBox>
        <TaskWrapper title={'Today'} upperHeaderTitle={'Today'}>
          {tasks
            .filter(
              ({ dueDate, completed }) =>
                DateUtils.isTodayDate(dueDate) && !completed
            )
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                markAsDone={onMarkAsDone}
                onTaskSelect={onTaskSelect}
              />
            ))}
          <TaskAddButton
            onTaskAdd={onTaskAdd}
            defaultDate={defaultDay.current}
          />
        </TaskWrapper>
      </ContentBox>

      <SelectedTaskSection
        key={selectedTask ? selectedTask.id : ''}
        deselectTask={deselectTask}
        task={selectedTask}
        onTaskUpdate={updateTaskHandler}
      />
    </Row>
  );
};
