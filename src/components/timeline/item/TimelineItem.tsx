import { Task } from '../../../common/types/tasks.types';
import { FC } from 'react';
import { useTimelineItemStyles } from './styles';
import DateUtils from '../../../common/utils/dateUtils';
import { Box, useTheme } from '@mui/system';
import { Checkbox } from '@mui/material';
import { Row } from '../../common/utilities/row/Row';

type Props = {
  task: Task;
  onClick: (task: Task) => void;
  active: boolean;
  markAsDone: (id: Task['id']) => void;
};

export const TimelineItem: FC<Props> = ({ task, onClick, active, markAsDone }) => {
  const theme = useTheme();
  const date = DateUtils.formatDateForTask(task.dueDate);
  const defaultColor = theme.palette.custom.mainBackgroundColor;
  const activeColor = theme.palette.custom.activeMainBackgroundColor;
  const classes = useTimelineItemStyles({ active, activeColor, defaultColor });

  const handleClick = () => onClick(task);

  const handleMarkAsDone = () => markAsDone(task.id);

  return (
    <div className={classes.container} onClick={handleClick}>
      <Row alignVerticalCenter>
        <Checkbox checked={task.completed} color={'warning'} size={'small'} className={classes.checkbox} onChange={handleMarkAsDone} />
        <Box>
          <p className={classes.title}>{task.title}</p>
          {date.value && <p className={classes.date}>{date.value}</p>}
        </Box>
      </Row>
    </div>
  );
};
