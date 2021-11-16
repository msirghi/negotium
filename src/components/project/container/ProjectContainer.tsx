import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useRef, useState } from 'react';
import { IProject } from '../../../common/types/projects.types';
import { Row } from '../../common/utilities/row/Row';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { useFetchProjectTasks } from '../../../common/hooks/tasks/useFetchProjectTasks';
import { ITask } from '../../../common/types/tasks.types';
import SortUtils from '../../../common/utils/sortUtils';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { Nullable } from '../../../common/types/common.types';
import TaskUtils from '../../common/utilities/taskUtils/TaskUtils';
import TaskService from '../../../services/TaskService';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';

export const ProjectContainer = () => {
  const router = useRouter();
  const projectId = useRef<string>(router.query.id as string);
  const [selectedProject, setSelectedProjects] = useState<IProject>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [tasks, setTasks] = useState<ITask[]>();
  const {
    data: taskData,
    isLoading: loadingTasks,
    refetch,
  } = useFetchProjectTasks(projectId.current);
  const [selectedTask, setSelectedTask] = useState<Nullable<ITask>>(null);

  const initTasks = async () => {
    await refetch();
    setTasks(taskData);
  };

  useEffect(() => {
    initTasks();
  }, [projectId.current]);

  useEffect(() => {
    if (taskData) {
      setTasks(taskData);
    }
  }, [taskData]);

  useEffect(() => {
    projectId.current = router.query.id as string;
  }, [router.query.id]);

  useEffect(() => {
    if (projects) {
      setSelectedProjects(projects.find((p) => p.id === router.query.id));
    }
  }, [projects, router.query.id]);

  if (!selectedProject || loadingTasks || !tasks) {
    return <div />;
  }

  const deselectTask = () => setSelectedTask(null);

  const selectTask = (task: ITask) => setSelectedTask(task);

  const markAsDone = async (taskId: ITask['id']) => {
    setSelectedTask(null);
    await TaskUtils.markAsDone(taskId, refetch);
  };

  const addTaskHandler = async (title: string, date: Nullable<Date>) => {
    const newTask: Omit<ITask, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length - 1,
      projectId.current
    );
    setTasks((prevState) => [...(prevState || []), newTask as ITask]);
    await TaskService.createTask(newTask);
    await refetch();
  };

  const onTaskUpdate = (updatedTask: ITask) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks([...updatedTasks]);
  };

  return (
    <div>
      <Row fullWidth>
        <ContentBox>
          <TaskWrapper title={selectedProject.name} upperHeaderTitle={'Projects'}>
            {SortUtils.sortByDate(tasks)
              .filter(({ completed }) => !completed)
              .map((task) => {
                return (
                  <TaskItem
                    task={task}
                    key={task.id}
                    markAsDone={markAsDone}
                    onTaskSelect={selectTask}
                  />
                );
              })}
            <TaskAddButton onTaskAdd={addTaskHandler} />
          </TaskWrapper>
        </ContentBox>
        <SelectedTaskSection
          task={selectedTask}
          deselectTask={deselectTask}
          key={selectedTask ? selectedTask.id : ''}
          onTaskUpdate={onTaskUpdate}
        />
      </Row>
    </div>
  );
};
