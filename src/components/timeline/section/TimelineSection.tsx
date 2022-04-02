import { Task, TimelineGroup } from '../../../common/types/tasks.types';
import DateUtils from '../../../common/utils/dateUtils';
import SmoothList from 'react-smooth-list';
import { TimelineTitle } from '../title/TimelineTitle';
import { TimelineItem } from '../item/TimelineItem';
import { Nullable } from '../../../common/types/common.types';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../../atoms/showCompleted/showCompleted.atom';
import { TaskDateType } from '../../../common/constants/enums';

type Props = {
  group: TimelineGroup;
  selectTask: (task: Task) => void;
  selectedTask: Nullable<Task>;
  markAsDone: (id: Task['id']) => void;
};

export const TimelineSection = ({ group, selectTask, selectedTask, markAsDone }: Props) => {
  const date = DateUtils.formatDateForTask(group.date);
  const [showCompleted] = useAtom(showCompletedAtom);
  const tasks = group.tasks.filter(({ completed }) => (showCompleted ? true : !completed));
  const shouldShow = tasks.length !== 0;

  if (!shouldShow) {
    return <div />;
  }

  return (
    <>
      <span id={date.type === TaskDateType.Today ? 'today' : ''} />
      <SmoothList key={date.value}>
        <TimelineTitle dateType={date.type} title={date.value || 'No date'} />
        {tasks.map((t) => (
          <TimelineItem markAsDone={markAsDone} task={t} key={t.id} onClick={selectTask} active={t.id === selectedTask?.id} />
        ))}
      </SmoothList>
    </>
  );
};
