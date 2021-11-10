import { FC } from 'react';
import { ITask } from '../../../../../common/types/tasks.types';
import { Checkbox, Chip, FormControlLabel } from '@mui/material';
import styles from './TaskItem.module.scss';
import { Row } from '../../../utilities/row/Row';
import { If } from '../../../utilities/if/If';
import TaskItemUtils from './utils/utils';

type Props = {
  task: ITask;
};

export const TaskItem: FC<Props> = ({ task }) => {
  const { title, dueDate } = task;

  const chipOptions = TaskItemUtils.getDateBadgeLabel(dueDate);

  return (
    <Row className={styles.tiItem} alignVerticalCenter>
      <FormControlLabel
        control={<Checkbox />}
        label={title}
        sx={{ width: '%' }}
      />
      <div>
        <If condition={!!chipOptions}>
          <Chip
            label={chipOptions?.title}
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
