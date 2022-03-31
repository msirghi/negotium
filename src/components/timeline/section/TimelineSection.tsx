import { Task, TimelineGroup } from '../../../common/types/tasks.types';
import DateUtils from '../../../common/utils/dateUtils';
import SmoothList from 'react-smooth-list';
import { TimelineTitle } from '../title/TimelineTitle';
import { TimelineItem } from '../item/TimelineItem';
import { Nullable } from '../../../common/types/common.types';

type Props = {
  group: TimelineGroup;
  selectTask: (task: Task) => void;
  selectedTask: Nullable<Task>;
};

export const TimelineSection = ({ group, selectTask, selectedTask }: Props) => {
  const date = DateUtils.formatDateForTask(group.date).value;

  return (
    <SmoothList key={date}>
      <TimelineTitle title={date || 'No date'} />
      {group.tasks.map((t) => (
        <TimelineItem task={t} key={t.id} onClick={selectTask} active={t.id === selectedTask?.id} />
      ))}
    </SmoothList>
  );
};
