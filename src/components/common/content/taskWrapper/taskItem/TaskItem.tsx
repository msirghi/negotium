import { FC } from 'react';
import { ITask } from '../../../../../common/types/tasks.types';
import { Checkbox, Chip, FormControlLabel } from '@mui/material';
import styles from './TaskItem.module.scss';
import { Row } from '../../../utilities/row/Row';
import { If } from '../../../utilities/if/If';
import TaskItemUtils from './utils/utils';
import { makeStyles } from '@mui/styles';

type Props = {
  task: ITask;
  markAsDone: (id: ITask['id']) => void;
  onTaskSelect: (task: ITask) => void;
};

const useStyles = makeStyles({
  chip: {
    marginLeft: 10,
  },
});

export const TaskItem: FC<Props> = ({ task, markAsDone, onTaskSelect }) => {
  const { title, dueDate } = task;
  const classes = useStyles();
  const chipOptions = TaskItemUtils.getDateBadgeLabel(dueDate!);

  return (
    <Row
      className={styles.tiItem}
      alignVerticalCenter
      onClick={() => onTaskSelect(task)}
    >
      <Row alignVerticalCenter>
        <Checkbox onChange={() => markAsDone(task.id)} />
        <div>{title}</div>
      </Row>
      <div>
        <If condition={!!chipOptions}>
          <Chip
            label={chipOptions?.title}
            className={classes.chip}
            style={{
              backgroundColor: chipOptions?.backgroundColor,
              color: chipOptions?.textColor,
            }}
            size={'small'}
          />
        </If>
      </div>
    </Row>
  );
};
