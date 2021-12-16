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
import ProjectService from '../../../../../services/ProjectService';
import FeatureToggles from '../../../../../utilities/featureToggles/FeatureToggles';
import { If } from '../../../utilities/if/If';
import StringUtils from "../../../../../common/utils/stringUtils";

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
  const isSlateInputEnabled = FeatureToggles.isFeatureEnabled(
    FeatureToggles.keys.SLATE_INPUT
  );

  const updateTaskTitle = (title: string) => {
    const updatedTitle = SlateUtils.removeDateKeyword(title);
    if (task.projectId) {
      ProjectService.updateProjectTask(task.projectId, {
        ...task,
        title: updatedTitle,
      });
    } else {
      TaskService.updateTaskName(task.id, updatedTitle);
    }
    onTaskUpdate({ ...task, title: updatedTitle, dueDate: _dueDate.current });
  };

  const updatedTitleDueDate = (dueDate: string) => {
    _dueDate.current = dueDate;
    if (task.projectId) {
      task.dueDate = dueDate;
      ProjectService.updateProjectTask(task.projectId, task);
    } else {
      TaskService.updateTaskDueDate(task.id, dueDate);
    }
    onTaskUpdate({ ...task, dueDate });
  };

  const updateTitleDebounce = useCallback(debounce(updateTaskTitle, 1000), [
    task,
  ]);

  const updateDueDateDebounce = useCallback(
    debounce(updatedTitleDueDate, 1000),
    []
  );

  const onTitleChange = useCallback(
    (value: Descendant[] | string) => {
      if (isSlateInputEnabled) {
        const stringified = JSON.stringify(value);
        SlateUtils.detectDateKeywords(
          stringified,
          (transformedToDate) =>
            transformedToDate && updateDueDateDebounce(transformedToDate)
        );
        setTitleValue(stringified);
        updateTitleDebounce(stringified);
        return;
      }

      const values = StringUtils.getTaskInputDateByKeywords(value as string);
      if (values.date) {
        updateDueDateDebounce(values.date);
      }
      setTitleValue(values.value as string);
      updateTitleDebounce(values.value as string);
    },
    []
  );

  useEffect(() => {
    setTitleValue(task.title);
  }, [task]);

  return (
    <Box className={classes.root}>
      <If condition={isSlateInputEnabled}>
        <MentionInput
          onChange={onTitleChange}
          // defaultValue={JSON.parse(titleValue)}
          keywords={MENTION_ARRAY_KEYWORDS}
        />
      </If>

      <If condition={!isSlateInputEnabled}>
        <TextField
          fullWidth
          className={classes.input}
          value={titleValue}
          onChange={(e) => onTitleChange(e.target.value)}
          variant={'standard'}
          inputProps={{'data-testid': 'title-input'}}
          InputProps={{
            disableUnderline: true,
            style: { fontWeight: 'bold', fontSize: 18 },
          }}
        />
      </If>

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
