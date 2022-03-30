import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { useState } from 'react';
import { Task } from '../../../common/types/tasks.types';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import { useSnackbar } from 'notistack';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import { Row } from '../../common/utilities/row/Row';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { Nullable } from '../../../common/types/common.types';
import { ContentBox } from '../../common/boxes/content/ContentBox';

import { DndTaskWrapper } from '../../common/dnd/taskWrapper/DndTaskWrapper';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../../redux/selectors/tasks.selectors';
import { useTasksActions } from '../../../common/hooks/tasks/useTasksActions';
import SortUtils from "../../../common/utils/sortUtils";

type Props = {
  title: string;
  subtitle: string;
  predefinedTasks: Task[];
};

export const InboxContainer = ({ title, subtitle, predefinedTasks }: Partial<Props>) => {
  const tasks = useSelector(tasksSelector);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('common');
  const { handleTaskAdd, handleMarkTaskAsDone, handleTaskUpdate } = useTasksActions();
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);

  const onAddTask = (title: string, date: Nullable<Date>) => {
    handleTaskAdd(title, date);
    enqueueSnackbar(t('snackbarTitles.taskAdded'), { anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER });
  };

  const markAsDone = async (taskId: Task['id']) => {
    enqueueSnackbar(t('snackbarTitles.taskMarkedAsDone'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    setSelectedTask(null);
    handleMarkTaskAsDone(taskId);
  };

  const onTaskUpdate = (updatedTask: Task, options?: { deselectTask: boolean }) => {
    handleTaskUpdate(updatedTask, updateSelectedTask);
    if (options && options.deselectTask) {
      deselectTask();
    }
  };

  const updateSelectedTask = (tasks: Task[]) => {
    setSelectedTask(tasks.find((t) => t.id === selectedTask?.id)!);
  };

  const onTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const deselectTask = () => {
    setSelectedTask(null);
  };

  return (
    <Row fullWidth>
      <ContentBox>
        <DndTaskWrapper tasks={predefinedTasks || tasks} updateTasks={() => {}}>
          <TaskWrapper title={title || t('pageTitles.inbox')} upperHeaderTitle={subtitle || t('pageTitles.inbox')}>
            {(predefinedTasks || SortUtils.sortTasksByDate(tasks))
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
        key={selectedTask ? selectedTask.id : ''}
        deselectTask={deselectTask}
        task={selectedTask}
        onTaskUpdate={onTaskUpdate}
      />
    </Row>
  );
};
