import { ContentBox } from '../../common/boxes/content/ContentBox';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../../redux/selectors/tasks.selectors';
import { TimelineItem } from '../item/TimelineItem';
import { TimelineTitle } from '../title/TimelineTitle';
import { SelectedTaskSection } from '../../common/content/selectedTask';
import { Row } from '../../common/utilities/row/Row';
import { useState } from 'react';
import { Nullable } from '../../../common/types/common.types';
import { Task } from '../../../common/types/tasks.types';
import GroupUtils from '../../../common/utils/groupUtils';
import DateUtils from '../../../common/utils/dateUtils';
import SortUtils from '../../../common/utils/sortUtils';
import SmoothList from 'react-smooth-list';
import { useTasksActions } from '../../../common/hooks/tasks/useTasksActions';

const TimelineContainer = () => {
  const tasks = useSelector(tasksSelector);
  const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);
  const groupedTasks = GroupUtils.groupTasksByDay(tasks);
  const selectTask = (task: Task) => setSelectedTask(task);
  const { handleTaskUpdate } = useTasksActions();

  const onTaskUpdate = (updatedTask: Task) => {
    handleTaskUpdate(updatedTask, () => {});
  };

  return (
    <Row>
      <ContentBox>
        <TaskWrapper title={'Timeline'} upperHeaderTitle={'Timeline'}>
          <div>Task 1</div>
        </TaskWrapper>
        {groupedTasks
          .sort((i, y) => SortUtils.sortByDate(i.date, y.date))
          .map((group) => {
            const date = DateUtils.formatDateForTask(group.date).value;
            return (
              <SmoothList key={date}>
                <TimelineTitle title={date || 'No date'} />
                {group.tasks.map((t) => (
                  <TimelineItem task={t} key={t.id} onClick={selectTask} active={t.id === selectedTask?.id} />
                ))}
              </SmoothList>
            );
          })}
        {tasks.slice(10, 15).map((task) => {})}
      </ContentBox>

      <SelectedTaskSection task={selectedTask} onTaskUpdate={onTaskUpdate} deselectTask={() => {}} markAsDone={() => {}} />
    </Row>
  );
};

export default TimelineContainer;
