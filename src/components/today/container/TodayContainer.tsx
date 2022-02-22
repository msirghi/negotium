import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import DateUtils from '../../../common/utils/dateUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import { Task } from '../../../common/types/tasks.types';
import { FC, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import { useSnackbar } from 'notistack';
import { TaskSkeleton } from '../../common/skeletons/taskSkeleton/TaskSkeleton';
import { Nullable } from '../../../common/types/common.types';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { Row } from '../../common/utilities/row/Row';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import useTranslation from 'next-translate/useTranslation';
import { DndTaskWrapper } from '../../common/dnd/taskWrapper/DndTaskWrapper';

type Props = {
  useData?: boolean;
};

export const TodayContainer: FC<Props> = ({ useData }) => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<Task[]>([]);
  const defaultDay = useRef(dayjs().toDate());
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const onMarkAsDone = async (taskId: Task['id']) => {
    setTasks((prevState) => prevState.filter(({ id }) => id !== taskId));
    enqueueSnackbar(t('snackbarTitles.taskMarkedAsDone'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await TaskService.markTaskAsDone(taskId);
  };

  const onTaskAdd = async (title: string, date: Nullable<Date>) => {
    const task: Omit<Task, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length
    );
    enqueueSnackbar(t('snackbarTitles.taskAdded'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    setTasks((prevState) => [...prevState, task as Task]);
    await TaskService.createTask(task);
    await refetch();
  };

  const updateTaskHandler = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks([...updatedTasks]);
  };

  const onTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const deselectTask = () => setSelectedTask(null);

  if (isLoading || !data) {
    return <TaskSkeleton />;
  }

  const renderData = useData ? data : tasks;

  return (
    <Row fullWidth>
      <ContentBox>
        <DndTaskWrapper tasks={tasks} updateTasks={setTasks}>
          <TaskWrapper
            title={t('pageTitles.today')}
            upperHeaderTitle={t('pageTitles.today')}
          >
            {renderData
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
          </TaskWrapper>
        </DndTaskWrapper>
        <TaskAddButton onTaskAdd={onTaskAdd} defaultDate={defaultDay.current} />
      </ContentBox>

      <SelectedTaskSection
        key={selectedTask ? selectedTask.id : ''}
        deselectTask={deselectTask}
        task={selectedTask}
        onTaskUpdate={updateTaskHandler}
        markAsDone={() => {}}
      />
    </Row>
  );
};
