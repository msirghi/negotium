import { ITask } from '../../../../../common/types/tasks.types';
import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import { TaskSectionHeader } from '../header/TaskSectionHeader';
import { TaskSectionContent } from '../content/TaskSectionContent';
import { NullableDate } from '../../../../../common/types/common.types';

type Props = {
  task: ITask | null;
  onTaskUpdate: (task: ITask) => void;
};

const useStyles = makeStyles({
  root: {
    width: '50%',
    borderLeft: '1px solid lightgrey',
    height: '100vh',
    padding: 10,
  },
  divider: {
    padding: '10px 0',
  },
});

export const SelectedTaskSection: FC<Props> = ({ task, onTaskUpdate }) => {
  const classes = useStyles();

  const onDateUpdate = (newDate: NullableDate) => {
    onTaskUpdate({ ...task, dueDate: newDate });
  };

  if (!task) {
    return <Box>Not task selected</Box>;
  }

  return (
    <div className={classes.root}>
      <TaskSectionHeader task={task} onTaskDateUpdate={onDateUpdate} />
      <Divider className={classes.divider} />
      <TaskSectionContent task={task} onTaskUpdate={onTaskUpdate} />
    </div>
  );
};
