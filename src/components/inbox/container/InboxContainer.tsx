import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { useEffect, useState } from 'react';
import { ITask } from '../../../common/types/tasks.types';
import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import { NullableDate } from '../../../common/types/common.types';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import { useSnackbar } from 'notistack';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import SortUtils from '../../../common/utils/sortUtils';
import { TaskSkeleton } from '../../common/spinners/taskSkeleton/TaskSkeleton';
import { Row } from '../../common/utilities/row/Row';
import { SelectedTaskSection } from '../../common/content/selectedTask';

export const InboxContainer = () => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const onAddTask = async (title: string, date: NullableDate) => {
    const newTask: Omit<ITask, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length - 1
    );
    setTasks((prevState) => [...prevState, newTask as ITask]);
    enqueueSnackbar('Task added', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await TaskService.createTask(newTask);
    await refetch();
  };

  const markAsDone = async (taskId: ITask['id']) => {
    enqueueSnackbar('Task marked as done', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    setSelectedTask(null);
    await TaskUtils.markAsDone(taskId, refetch);
  };

  const onTaskUpdate = (updatedTask: ITask) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks([...updatedTasks]);
  };

  const onTaskSelect = (task: ITask) => {
    setSelectedTask(task);
  };

  if (isLoading || !data) {
    return <TaskSkeleton />;
  }

  return (
    <Row fullWidth>
      <div style={{ width: '50%', padding: 20 }}>
        <TaskWrapper title={'Inbox'} upperHeaderTitle={'Inbox'}>
          {SortUtils.sortByDate(tasks)
            .filter((task) => !task.completed)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                markAsDone={markAsDone}
                onTaskSelect={onTaskSelect}
              />
            ))}
          <TaskAddButton onTaskAdd={onAddTask} />
        </TaskWrapper>
      </div>
      <SelectedTaskSection
        key={selectedTask ? selectedTask.id : ''}
        task={selectedTask}
        onTaskUpdate={onTaskUpdate}
      />
    </Row>
  );
};
