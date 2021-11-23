import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import {FC, useEffect, useState} from 'react';
import { ITask } from '../../../common/types/tasks.types';
import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { useSnackbar } from 'notistack';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import SortUtils from '../../../common/utils/sortUtils';
import { TaskSkeleton } from '../../common/skeletons/taskSkeleton/TaskSkeleton';
import { Row } from '../../common/utilities/row/Row';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { Nullable } from '../../../common/types/common.types';
import { ContentBox } from '../../common/boxes/content/ContentBox';

import { useTranslation } from 'next-i18next';

type Props = {
  useData?: boolean;
}

export const InboxContainer: FC<Props> = ({useData}) => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const onAddTask = async (title: string, date: Nullable<Date>) => {
    const newTask: Omit<ITask, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length - 1
    );
    setTasks((prevState) => [...prevState, newTask as ITask]);
    enqueueSnackbar(t('snackbarTitles.taskAdded'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await TaskService.createTask(newTask);
    await refetch();
  };

  const markAsDone = async (taskId: ITask['id']) => {
    enqueueSnackbar(t('snackbarTitles.taskMarkedAsDone'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    setSelectedTask(null);
    await TaskUtils.markAsDone(taskId, refetch);
  };

  const onTaskUpdate = (updatedTask: ITask) => {
    const { id } = updatedTask;
    console.log('updatedTask: ', updatedTask);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks([...updatedTasks]);
    updateSelectedTask(updatedTasks);
  };

  const updateSelectedTask = (tasks: ITask[]) => {
    setSelectedTask(tasks.find((t) => t.id === selectedTask?.id)!);
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
        <TaskWrapper
          title={t('pageTitles.inbox')}
          upperHeaderTitle={t('pageTitles.inbox')}
        >
          {SortUtils.sortByDate(useData ? data : tasks)
            .filter((task) => !task.completed && !task.projectId)
            .map((task) => (
              <TaskItem
                key={`${task.id} ${task.dueDate} ${task.title}`}
                task={task}
                markAsDone={markAsDone}
                onTaskSelect={onTaskSelect}
              />
            ))}
          <TaskAddButton onTaskAdd={onAddTask} />
        </TaskWrapper>
      </ContentBox>
      <SelectedTaskSection
        key={selectedTask ? `${selectedTask.id}` : ''}
        deselectTask={deselectTask}
        task={selectedTask}
        onTaskUpdate={onTaskUpdate}
      />
    </Row>
  );
};
