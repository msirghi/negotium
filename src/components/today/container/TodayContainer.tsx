import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import DateUtils from '../../../common/utils/dateUtils';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import { ITask } from '../../../common/types/tasks.types';
import { useEffect, useRef, useState } from 'react';
import { NullableDate } from '../../../common/types/common.types';
import dayjs from 'dayjs';

export const TodayContainer = () => {
  const { isLoading, data } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const defaultDay = useRef(dayjs().toDate());

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const onMarkAsDone = async (taskId: ITask['id']) => {
    setTasks((prevState) => prevState.filter(({ id }) => id !== taskId));
    await TaskService.markTaskAsDone(taskId);
  };

  const onTaskAdd = (title: string, date: NullableDate) => {
    const task: Omit<ITask, 'id'> = {
      title,
      dueDate: date ? dayjs(date as unknown as Date).format() : '',
      orderNumber: tasks.length,
      createdDate: dayjs().format(),
      completed: false,
    };
  };

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
