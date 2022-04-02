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
import { TimelineSection } from '../section/TimelineSection';
import { Box } from '@mui/system';
import { TimelineOptions } from '../options/TimelineOptions';

const TimelineContainer = () => {
  const tasks = useSelector(tasksSelector);
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);
  const groupedTasks = GroupUtils.groupTasksByDay(tasks);
  const selectTask = (task: Task) => setSelectedTask(task);
  const { handleTaskUpdate, handleMarkTaskAsDone, handleTaskAdd } = useTasksActions();

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

  return (
    <Row>
      <ContentBox>
        <TaskWrapper title={'Timeline'} upperHeaderTitle={'Timeline'}>
          <div />
        </TaskWrapper>
        <TimelineOptions onTaskAdd={onTaskAdd} />
        <Box>
          {groupedTasks.map((group) => (
            <TimelineSection key={group.date} group={group} selectTask={selectTask} selectedTask={selectedTask} markAsDone={markAsDone} />
          ))}
        </Box>
      </ContentBox>

      <SelectedTaskSection task={selectedTask} onTaskUpdate={onTaskUpdate} deselectTask={deselectTask} markAsDone={markAsDone} />
    </Row>
  );
};

export default TimelineContainer;
