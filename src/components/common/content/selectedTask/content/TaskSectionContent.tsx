import { ITask } from '../../../../../common/types/tasks.types';
import { FC, useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import debounce from 'lodash.debounce';
import TaskService from '../../../../../services/TaskService';

type Props = {
  task: ITask;
  onTaskUpdate: (task: ITask) => void;
};

const useStyles = makeStyles({
  root: {
    padding: 15,
  },
  input: {
    fontWeight: 'bold',
  },
});

export const TaskSectionContent: FC<Props> = ({ task, onTaskUpdate }) => {
  const [titleValue, setTitleValue] = useState(task.title);
  const [descriptionValue, setDescriptionValue] = useState('No description.');
  const classes = useStyles();

  const updateTaskTitle = (title: string) => {
    TaskService.updateTaskName(task.id, title);
    onTaskUpdate({ ...task, title: title });
  };

  const updateTitleDebounce = useCallback(debounce(updateTaskTitle, 1000), [
    task,
  ]);

  const onTitleChange = (value: string) => {
    setTitleValue(value);
    updateTitleDebounce(value);
  };

  useEffect(() => {
    setTitleValue(task.title);
  }, [task]);

  return (
    <Box className={classes.root}>
      <TextField
        fullWidth
        className={classes.input}
        value={titleValue}
        onChange={(e) => onTitleChange(e.target.value)}
        variant={'standard'}
        InputProps={{
          disableUnderline: true,
          style: { fontWeight: 'bold', fontSize: 18 },
        }}
      />

      <TextField
        className={classes.input}
        value={descriptionValue}
        multiline
        rows={4}
        onChange={(e) => setTitleValue(e.target.value)}
        variant={'standard'}
        InputProps={{ disableUnderline: true }}
      />
    </Box>
  );
};
