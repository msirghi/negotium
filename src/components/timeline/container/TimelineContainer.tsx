import { ContentBox } from '../../common/boxes/content/ContentBox';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../../redux/selectors/tasks.selectors';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { Row } from '../../common/utilities/row/Row';
import { useState } from 'react';
import { Nullable } from '../../../common/types/common.types';
import { Task } from '../../../common/types/tasks.types';
import GroupUtils from '../../../common/utils/groupUtils';
import { useTasksActions } from '../../../common/hooks/tasks/useTasksActions';
import { TimelineOptions } from '../options/TimelineOptions';
import { ListCalendar } from '../../calendar/list/ListCalendar';
import { TimelineView } from '../../../common/constants/enums';
import { If } from '../../common/utilities/if/If';
import { Box } from '@mui/system';
import { TimelineSection } from '../section/TimelineSection';
import useTranslation from 'next-translate/useTranslation';
import {ListViewInfo} from "../info/ListViewInfo";
import StorageUtils from "../../../common/utils/storageUtils";

const TimelineContainer = () => {
  const tasks = useSelector(tasksSelector);
  const { t } = useTranslation('timeline');
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);
  const groupedTasks = GroupUtils.groupTasksByDay(tasks);
  const [view, setView] = useState(StorageUtils.localStorage.getTimelineDefaultView());
  const { handleTaskUpdate, handleMarkTaskAsDone, handleTaskAdd } = useTasksActions();

  const selectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const selectTaskById = (id: Task['id']) => {
    setSelectedTask(tasks.find((t) => t.id === id) || null);
  };

  const onTaskUpdate = (updatedTask: Task) => {
    handleTaskUpdate(updatedTask, () => {});
  };

  const markAsDone = (id: Task['id']) => {
    handleMarkTaskAsDone(id);
    if (id === selectedTask?._id) {
      deselectTask();
    }
  };

  const deselectTask = () => {
    setSelectedTask(null);
  };

  const onTaskAdd = (title: string, date: Nullable<Date>) => {
    handleTaskAdd(title, date);
  };

  const onViewSwitch = () => {
    const newView = view === TimelineView.DEFAULT ? TimelineView.LIST : TimelineView.DEFAULT
    setView(newView);
    StorageUtils.localStorage.setTimelineView(newView);
  };

  return (
    <Row>
      <ContentBox>
        <TaskWrapper title={t('title')} upperHeaderTitle={t('title')}>
          <div />
        </TaskWrapper>
        <TimelineOptions onTaskAdd={onTaskAdd} onViewSwitch={onViewSwitch} currentView={view} />

        <If condition={view === TimelineView.LIST}>
          <ListViewInfo />
          <ListCalendar tasks={tasks} onTaskClick={selectTaskById} />
        </If>

        <If condition={view === TimelineView.DEFAULT}>
          <Box>
            {groupedTasks.map((group) => (
              <TimelineSection key={group.date} group={group} selectTask={selectTask} selectedTask={selectedTask} markAsDone={markAsDone} />
            ))}
          </Box>
        </If>
      </ContentBox>

      <SelectedTaskSection
        key={selectedTask?.id}
        task={selectedTask}
        onTaskUpdate={onTaskUpdate}
        deselectTask={deselectTask}
        markAsDone={markAsDone}
      />
    </Row>
  );
};

export default TimelineContainer;
