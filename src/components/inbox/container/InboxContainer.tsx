import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskWrapperTitleOptions } from '../../common/content/types';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { useEffect, useState } from 'react';
import { ISection, ITask } from '../../../common/types/tasks.types';
import dayjs from 'dayjs';
import { useFetchTasks } from '../../../common/hooks/tasks/useFetchTasks';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TaskService from '../../../services/TaskService';
import { NullableDate } from '../../../common/types/common.types';

const editableOptions: TaskWrapperTitleOptions = {
  title: 'Inbox',
  onSave: (val) => console.log(val),
};

export const InboxContainer = () => {
  const { isLoading, data, refetch } = useFetchTasks();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sections, setSections] = useState<ISection[]>([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const onAddTask = async (title: string, date: NullableDate) => {
    const newTask: Omit<ITask, 'id'> = {
      title,
      orderNumber: tasks.length + 1,
      createdDate: dayjs().format(),
      dueDate: date ? dayjs(date as unknown as Date).format() : '',
      completed: false,
    };
    setTasks((prevState) => [...prevState, newTask as ITask]);
    await TaskService.createTask(newTask);
    await refetch();
  };

  const markAsDone = async (taskId: ITask['id']) => {
    await TaskService.markTaskAsDone(taskId);
    await refetch();
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskWrapper
        title={'Inbox'}
        upperHeaderTitle={'Inbox'}
        editableOptions={editableOptions}
      >
        {tasks
          .filter((task) => !task.completed)
          .map((task) => {
            return (
              <TaskItem key={task.id} task={task} markAsDone={markAsDone} />
            );
          })}
        <TaskAddButton onTaskAdd={onAddTask} />
      </TaskWrapper>
    </div>
  );
};
