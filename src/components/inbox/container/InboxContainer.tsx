import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { FC, useEffect, useState } from 'react';
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
import { DndTaskWrapper } from '../../common/dnd/taskWrapper/DndTaskWrapper';

type Props = {
  useData?: boolean;
};

export const InboxContainer: FC<Props> = ({ useData }) => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (data) {
      setTasks(data.sort((s1, s2) => s1.orderNumber! - s2.orderNumber!));
    }
  }, [data]);

  const onAddTask = async (title: string, date: Nullable<Date>) => {
    const orderNumber = TaskUtils.getMaxTaskOrderNumber(tasks) + 1;
    const newTask: Omit<ITask, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      orderNumber
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

  const onTaskUpdate = (
    updatedTask: ITask,
    options?: { deselectTask: boolean }
  ) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks([...updatedTasks]);
    updateSelectedTask(updatedTasks);
    if (options && options.deselectTask) {
      deselectTask();
    }
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
        <DndTaskWrapper tasks={tasks} updateTasks={setTasks}>
          <TaskWrapper
            title={t('pageTitles.inbox')}
            upperHeaderTitle={t('pageTitles.inbox')}
          >
            {/*{SortUtils.sortByDate(useData ? data : tasks)*/}
            {tasks
              .filter((task) => !task.completed && !task.projectId)
              .map((task, index) => (
                <TaskItem
                  dndIndex={index}
                  key={`${task.id} ${task.dueDate} ${task.title}`}
                  task={task}
                  markAsDone={markAsDone}
                  onTaskSelect={onTaskSelect}
                />
              ))}
          </TaskWrapper>
        </DndTaskWrapper>
        <TaskAddButton onTaskAdd={onAddTask} />
      </ContentBox>
      <SelectedTaskSection
        markAsDone={markAsDone}
        key={selectedTask ? `${selectedTask.id}` : ''}
        deselectTask={deselectTask}
        task={selectedTask}
        onTaskUpdate={onTaskUpdate}
      />
    </Row>
  );
};
