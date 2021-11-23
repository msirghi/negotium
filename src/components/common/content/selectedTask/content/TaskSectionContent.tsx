import { ITask } from '../../../../../common/types/tasks.types';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import debounce from 'lodash.debounce';
import TaskService from '../../../../../services/TaskService';
import MentionInput from '../../../form/input/mention/MentionInput';
import { MENTION_ARRAY_KEYWORDS } from '../../../../../common/constants/constants';
import SlateUtils from '../../../../../common/utils/slateUtils';
import { Descendant } from 'slate';

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
  const _dueDate = useRef(task.dueDate);
  const classes = useStyles();

  const updateTaskTitle = (title: string) => {
    const updatedTitle = SlateUtils.removeDateKeyword(title);
    TaskService.updateTaskName(task.id, updatedTitle);
    onTaskUpdate({ ...task, title: updatedTitle, dueDate: _dueDate.current });
  };

  const updatedTitleDueDate = (dueDate: string) => {
    _dueDate.current = dueDate;
    TaskService.updateTaskDueDate(task.id, dueDate);
    onTaskUpdate({ ...task, dueDate });
  };

  const updateTitleDebounce = useCallback(debounce(updateTaskTitle, 1000), [
    task,
  ]);

  const updateDueDateDebounce = useCallback(debounce(updatedTitleDueDate, 1000), [
    _dueDate.current,
  ]);

  const onTitleChange = useCallback((value: Descendant[]) =>{
    const stringified = JSON.stringify(value);
    SlateUtils.detectDateKeywords(
      stringified,
      (transformedToDate) =>
        transformedToDate && updateDueDateDebounce(transformedToDate)
    );
    setTitleValue(stringified);
    updateTitleDebounce(stringified);
  }, [task]);

  useEffect(() => {
    setTitleValue(task.title);
  }, [task]);

  return (
    <Box className={classes.root}>
      <MentionInput
        onChange={onTitleChange}
        defaultValue={JSON.parse(titleValue)}
        keywords={MENTION_ARRAY_KEYWORDS}
      />

      <TextField
        className={classes.input}
        value={descriptionValue}
        multiline
        rows={4}
        variant={'standard'}
        InputProps={{ disableUnderline: true }}
      />
    </Box>
  );
};
