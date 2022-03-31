import { Task } from '../../../common/types/tasks.types';
import { FC } from 'react';
import { useTimelineItemStyles } from './styles';
import DateUtils from '../../../common/utils/dateUtils';
import { useTheme } from '@mui/system';

type Props = {
  task: Task;
  onClick: (task: Task) => void;
  active: boolean;
};

export const TimelineItem: FC<Props> = ({ task, onClick, active }) => {
  const theme = useTheme();
  const defaultColor = theme.palette.primary.light;
  const activeColor = theme.palette.primary.main;
  const classes = useTimelineItemStyles({ active, activeColor, defaultColor });
  const date = DateUtils.formatDateForTask(task.dueDate);

  const handleClick = () => onClick(task);

  return (
    <div className={classes.container} onClick={handleClick}>
      <p className={classes.title}>{task.title}</p>
      {date.value && <p className={classes.date}>{date.value}</p>}
    </div>
  );
};
