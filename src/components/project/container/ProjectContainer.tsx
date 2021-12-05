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
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import { ProjectDialogWrapper } from '../dialog/ProjectDialogWrapper';
import ProjectService from '../../../services/ProjectService';
import Head from 'next/head';
import StringUtils from '../../../common/utils/stringUtils';
import { useTranslation } from 'next-i18next';

export const ProjectContainer = () => {
  const router = useRouter();
  const projectId = useRef<string>(router.query.id as string);
  const { t } = useTranslation();

  const projects = useSelector((state: RootState) => state.projects.projects);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedProject, setSelectedProjects] = useState<IProject>();
  const [isProjectDialogOpened, setProjectDialogOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Nullable<ITask>>(null);

  const {
    data: taskData,
    isLoading: loadingTasks,
    refetch,
  } = useFetchProjectTasks(projectId.current);

  const initTasks = async () => {
    await refetch();
    if (taskData) {
      setTasks(taskData);
    }
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
      setSelectedProjects(
        projects.find((p) => String(p.id) === String(router.query.id))
      );
    }
  }, [projects, router.query.id]);

  const toggleProjectDialog = () =>
    setProjectDialogOpened(!isProjectDialogOpened);

  if (!selectedProject || loadingTasks) {
    return <div />;
  }

  const deselectTask = () => setSelectedTask(null);

  const selectTask = (task: ITask) => setSelectedTask(task);

  const markAsDone = async (taskId: ITask['id']) => {
    setSelectedTask(null);
    const task = tasks.find((t) => t.id === taskId)!;
    setTasks((prevState) => prevState.filter((t) => t.id !== taskId));
    task.completed = true;
    await ProjectService.updateProjectTask(projectId.current, task);
  };

  const addTaskHandler = async (title: string, date: Nullable<Date>) => {
    const newTask: Omit<ITask, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length - 1,
      projectId.current
    );
    setTasks((prevState) => [...(prevState || []), newTask as ITask]);
    await ProjectService.addProjectTask(projectId.current, newTask);
    await refetch();
  };

  const onTaskUpdate = (updatedTask: ITask) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) =>
      task?.id === id ? updatedTask : task
    );

    setTasks([...updatedTasks]);
  };

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(selectedProject.name)}</title>
      </Head>
      <div key={selectedProject.id} data-testid={'content'}>
        <ProjectDialogWrapper
          project={selectedProject}
          open={isProjectDialogOpened}
          setOpen={setProjectDialogOpened}
        />
        <Row fullWidth>
          <ContentBox>
            <TaskWrapper
              projectOptions={{
                show: true,
                onClick: () => {},
              }}
              title={selectedProject.name}
              upperHeaderTitle={'Projects'}
              settingsOptions={{ onClick: toggleProjectDialog }}
            >
              {SortUtils.sortByDate(tasks)
                .filter(({ completed }) => !completed)
                .map((task) => {
                  return (
                    <TaskItem
                      task={task}
                      key={`${task.id} ${task.title}`}
                      markAsDone={markAsDone}
                      onTaskSelect={selectTask}
                    />
                  );
                })}
              <TaskAddButton onTaskAdd={addTaskHandler} />
            </TaskWrapper>
          </ContentBox>
          <SelectedTaskSection
            markAsDone={markAsDone}
            task={selectedTask}
            deselectTask={deselectTask}
            key={selectedTask ? selectedTask.id : ''}
            onTaskUpdate={onTaskUpdate}
          />
        </Row>
      </div>
    </>
  );
};
