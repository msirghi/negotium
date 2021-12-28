import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useRef, useState } from 'react';
import { Project } from '../../../common/types/projects.types';
import { Row } from '../../common/utilities/row/Row';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { ContentBox } from '../../common/boxes/content/ContentBox';
import { useFetchProjectTasks } from '../../../common/hooks/tasks/useFetchProjectTasks';
import { Section, Task } from '../../../common/types/tasks.types';
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
import { DndTaskWrapper } from '../../common/dnd/taskWrapper/DndTaskWrapper';
import { AddSectionRow } from '../../common/content/taskWrapper/section/add/AddSectionRow';
import { SectionWrapper } from '../../common/content/taskWrapper/section/wrapper/SectionWrapper';
import { If } from '../../common/utilities/if/If';

export const ProjectContainer = () => {
  const router = useRouter();
  const projectId = useRef<string>(router.query.id as string);
  const projects = useSelector((state: RootState) => state.projects.projects);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedProject, setSelectedProjects] = useState<Project>();
  const [isProjectDialogOpened, setProjectDialogOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);

  const {
    data: taskData,
    isLoading: loadingTasks,
    refetch,
  } = useFetchProjectTasks(projectId.current);

  const fetchTaskSections = async () => {
    const response = await ProjectService.getProjectSections(projectId.current);
    setSections(response as Section[]);
  };

  const initTasks = async () => {
    await refetch();
    if (taskData) {
      setTasks(taskData);
    }
  };

  useEffect(() => {
    initTasks();
    if (projectId.current) {
      fetchTaskSections();
    }
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

  const selectTask = (task: Task) => setSelectedTask(task);

  const markAsDone = async (taskId: Task['id']) => {
    setSelectedTask(null);
    const task = tasks.find((t) => t.id === taskId)!;
    setTasks((prevState) => prevState.filter((t) => t.id !== taskId));
    task.completed = true;
    await ProjectService.updateProjectTask(projectId.current, task);
  };

  const addTaskHandler = async (
    title: string,
    date: Nullable<Date>,
    sectionId?: string
  ) => {
    const newTask: Omit<Task, 'id'> = TaskUtils.getNewTaskObject(
      title,
      date,
      tasks.length - 1,
      projectId.current
    );
    if (sectionId) {
      newTask.sectionId = sectionId;
    }
    setTasks((prevState) => [...(prevState || []), newTask as Task]);
    await ProjectService.addProjectTask(projectId.current, newTask);
    await refetch();
  };

  const onTaskUpdate = (updatedTask: Task) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) =>
      task?.id === id ? updatedTask : task
    );

    setTasks([...updatedTasks]);
  };

  const getTasksBySection = (sectionId: string) => {
    return tasks.filter(
      (t) =>
        t.projectId === projectId.current &&
        !t.completed &&
        t.sectionId === sectionId
    );
  };

  const createNewSection = async (title: string) => {
    await ProjectService.addProjectSection(projectId.current, title);
    await fetchTaskSections();
  };

  const addSectionTaskHandler = () => {
    return (title: string, date: Nullable<Date>, sectionId: string) =>
      addTaskHandler(title, date, sectionId);
  };

  const handleSectionUpdate = (title: string, sectionId: string) => {
    const updatedSections = sections.map((sec) =>
      sec.id === sectionId ? { ...sec, title } : sec
    );
    setSections(updatedSections);
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
            <DndTaskWrapper tasks={tasks} updateTasks={setTasks}>
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
                  .filter(
                    ({ completed, sectionId }) => !completed && !sectionId
                  )
                  .map((task, idx) => {
                    return (
                      <TaskItem
                        task={task}
                        key={`${task.id} ${task.title}`}
                        markAsDone={markAsDone}
                        onTaskSelect={selectTask}
                        dndIndex={idx}
                      />
                    );
                  })}
              </TaskWrapper>
            </DndTaskWrapper>
            <TaskAddButton onTaskAdd={addTaskHandler} />
            <AddSectionRow onSectionSave={createNewSection} />

            <If condition={!!sections}>
              {sections.map((section) => (
                <SectionWrapper
                  key={section.id}
                  sectionId={section.id}
                  title={section.title}
                  tasks={getTasksBySection(section.id)}
                  onTaskAdd={addSectionTaskHandler()}
                  markAsDone={markAsDone}
                  onTaskSelect={selectTask}
                  onSectionUpdate={handleSectionUpdate}
                />
              ))}
            </If>
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
