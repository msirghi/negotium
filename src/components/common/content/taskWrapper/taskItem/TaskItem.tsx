import { FC } from 'react';
import { Task } from '../../../../../common/types/tasks.types';
import { Row } from '../../../utilities/row/Row';
import SlateUtils from '../../../../../common/utils/slateUtils';
import FeatureToggles from '../../../../../utilities/featureToggles/FeatureToggles';
import { Draggable } from 'react-beautiful-dnd';
import RoundCheckbox from '../../../form/checkbox/round/RoundCheckbox';
import DateUtils from '../../../../../common/utils/dateUtils';
import { useTaskItemStyles } from './styles';
import utils from './utils/utils';

type Props = {
  task: Task;
  markAsDone: (id: Task['id']) => void;
  onTaskSelect: (task: Task) => void;
  index?: number;
  dndIndex?: number;
};

export const TaskItem: FC<Props> = ({ task, markAsDone, onTaskSelect, index }) => {
  const classes = useTaskItemStyles();
  const { title, dueDate } = task;
  const isSlateInputEnabled = FeatureToggles.isFeatureEnabled(FeatureToggles.keys.SLATE_INPUT);
  const formattedDate = DateUtils.formatDateForTask(dueDate);

  const handleMarkAsDone = (id: Task['id']) => {
    return () => markAsDone(id);
  };

  const handleTaskSelect = () => {
    return () => onTaskSelect(task);
  };

  return (
    <Draggable draggableId={task.id} index={index!} isDragDisabled={!!task.projectId}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.container}>
            <div>
              <Row alignVerticalCenter onClick={handleTaskSelect()}>
                <Row alignVerticalCenter>
                  <RoundCheckbox size={'small'} onChange={handleMarkAsDone(task.id)} />
                  <div>{isSlateInputEnabled ? SlateUtils.serialize(JSON.parse(title)) : title}</div>
                </Row>
              </Row>
              <div
                className={classes.date}
                style={{
                  color: utils.getColorByDateType(formattedDate.type),
                }}
              >
                {formattedDate.value}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
