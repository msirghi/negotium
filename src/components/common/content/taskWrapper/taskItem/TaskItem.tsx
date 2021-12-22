import { FC } from 'react';
import { ITask } from '../../../../../common/types/tasks.types';
import { Checkbox, Chip } from '@mui/material';
import styles from './TaskItem.module.scss';
import { Row } from '../../../utilities/row/Row';
import { If } from '../../../utilities/if/If';
import TaskItemUtils from './utils/utils';
import { makeStyles } from '@mui/styles';
import SlateUtils from '../../../../../common/utils/slateUtils';
import FeatureToggles from '../../../../../utilities/featureToggles/FeatureToggles';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  task: ITask;
  markAsDone: (id: ITask['id']) => void;
  onTaskSelect: (task: ITask) => void;
  index?: number;
  dndIndex?: number;
};

const useStyles = makeStyles({
  chip: {
    marginLeft: 10,
  },
});

export const TaskItem: FC<Props> = ({
  task,
  markAsDone,
  onTaskSelect,
  index,
}) => {
  const { title, dueDate } = task;
  const classes = useStyles();
  const chipOptions = TaskItemUtils.getDateBadgeLabel(dueDate!);
  const isSlateInputEnabled = FeatureToggles.isFeatureEnabled(
    FeatureToggles.keys.SLATE_INPUT
  );

  return (
    <Draggable draggableId={task.id} index={index!}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <Row
                className={styles.tiItem}
                alignVerticalCenter
                onClick={() => onTaskSelect(task)}
              >
                <Row alignVerticalCenter>
                  <Checkbox
                    size={'small'}
                    onChange={() => markAsDone(task.id)}
                  />
                  <div>
                    {isSlateInputEnabled
                      ? SlateUtils.serialize(JSON.parse(title))
                      : title}
                  </div>
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
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
