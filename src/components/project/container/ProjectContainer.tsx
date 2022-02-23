import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FC, useEffect, useState } from 'react';
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
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import { ProjectDialogWrapper } from '../dialog/ProjectDialogWrapper';
import ProjectService from '../../../services/ProjectService';
import Head from 'next/head';
import StringUtils from '../../../common/utils/stringUtils';
import { DndTaskWrapper } from '../../common/dnd/taskWrapper/DndTaskWrapper';
import { AddSectionRow } from '../../common/content/taskWrapper/section/add/AddSectionRow';
import { SectionWrapper } from '../../common/content/taskWrapper/section/wrapper/SectionWrapper';
import { If } from '../../common/utilities/if/If';
import { SNACKBAR_POSITIONS } from '../../../common/constants/constants';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { ProjectSettingsOption } from '../../../common/constants/enums';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../../atoms/showCompleted/showCompleted.atom';
import { useHandleTaskUpdate } from '../../../hooks/useHandleTaskUpdate/useHandleTaskUpdate';

type Props = {
  projectId: string;
};

export const ProjectContainer: FC<Props> = ({ projectId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('common');
  const projects = useSelector((state: RootState) => state.projects.projects);
  const { tasks, setTasks, setProjectId, markTaskAsDone, addTask, updateTask, fetchTasks } = useHandleTaskUpdate();

  const [sections, setSections] = useState<Section[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [showCompleted, setShowCompleted] = useAtom(showCompletedAtom);
  const [isProjectDialogOpened, setProjectDialogOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);

  const fetchTaskSections = async () => {
    const response = await ProjectService.getProjectSections(projectId);
    setSections(response as Section[]);
  };

  const initTasks = async () => {
    await fetchTasks();
  };

  const fetchData = async () => {
    await initTasks();
    await fetchTaskSections();
  };

  useEffect(() => {
    setProjectId(projectId);
    setTasks([]);
    setSelectedTask(null);
    setSections([]);
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (projects) {
      setSelectedProject(projects.find((p) => String(p.id) === String(projectId)));
    }
  }, [projects, projectId]);

  const toggleProjectDialog = () => setProjectDialogOpened(!isProjectDialogOpened);

  const deselectTask = () => setSelectedTask(null);

  const selectTask = (task: Task) => setSelectedTask(task);

  const markAsDone = async (taskId: Task['id']) => {
    markTaskAsDone(taskId);
    setSelectedTask(null);
    enqueueSnackbar(t('snackbarTitles.taskMarkedAsDone'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
  };

  const addTaskHandler = async (title: string, date: Nullable<Date>, sectionId?: string) => {
    addTask(title, date, sectionId);
    enqueueSnackbar(t('snackbarTitles.taskAdded'), {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
  };

  const getTasksBySection = (sectionId: string) => {
    return tasks.filter((t) => t.projectId === projectId && t.sectionId === sectionId).filter((t) => (showCompleted ? true : !t.completed));
  };

  const createNewSection = async (title: string) => {
    await ProjectService.addProjectSection(projectId, title);
    await fetchTaskSections();
  };

  const addSectionTaskHandler = () => {
    return (title: string, date: Nullable<Date>, sectionId: string) => addTaskHandler(title, date, sectionId);
  };

  const handleSectionUpdate = (title: string, sectionId: string) => {
    const updatedSections = sections.map((sec) => (sec.id === sectionId ? { ...sec, title } : sec));
    ProjectService.updateProjectSectionTitle(projectId, sectionId, title);
    setSections(updatedSections);
  };

  const handleSectionRemove = async (sectionId: Section['id']) => {
    const updatedSections = sections.filter((s) => s.id !== sectionId);
    setSections(updatedSections);
    await ProjectService.deleteProjectSection(projectId, sectionId);
  };

  const displayTasks = SortUtils.sortByDate(tasks).filter(({ completed }) => (showCompleted ? true : !completed));

  const onSettingsChange = (option: ProjectSettingsOption) => {
    if (option === ProjectSettingsOption.SHOW_COMPLETED) {
      setShowCompleted(!showCompleted);
    }
  };

  if (!selectedProject) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{StringUtils.getPageTitle(selectedProject.name)}</title>
      </Head>
      <div data-testid={'content'}>
        <ProjectDialogWrapper project={selectedProject} open={isProjectDialogOpened} setOpen={setProjectDialogOpened} />
        <Row fullWidth>
          <ContentBox>
            <DndTaskWrapper tasks={tasks} updateTasks={setTasks}>
              <TaskWrapper
                projectOptions={{ show: true, onClick: onSettingsChange }}
                taskCount={displayTasks.length}
                title={selectedProject.name}
                upperHeaderTitle={t('mainMenuList.projects')}
                settingsOptions={{ onClick: toggleProjectDialog }}
              >
                {SortUtils.sortByCompletedFlag(displayTasks)
                  .filter(({ sectionId }) => !sectionId)
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
                  onSectionRemove={handleSectionRemove}
                />
              ))}
            </If>
          </ContentBox>
          <SelectedTaskSection
            markAsDone={markAsDone}
            task={selectedTask}
            deselectTask={deselectTask}
            key={selectedTask ? selectedTask.id : ''}
            onTaskUpdate={updateTask}
          />
        </Row>
      </div>
    </div>
  );
};
