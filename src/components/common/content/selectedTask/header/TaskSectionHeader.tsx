import {FC, useEffect, useState} from 'react';
import { Box } from '@mui/system';
import { Checkbox, Divider } from '@mui/material';
import { ITask } from '../../../../../common/types/tasks.types';
import { Row } from '../../../utilities/row/Row';
import { makeStyles } from '@mui/styles';
import DateUtils from '../../../../../common/utils/dateUtils';
import colors from '../../../../../common/styles/colors';
import dayjs from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { ScheduleDialog } from '../../taskWrapper/section/taskAdd/scheduleDialog/ScheduleDialog';
import { Nullable } from '../../../../../common/types/common.types';
import TaskService from '../../../../../services/TaskService';

type Props = {
  task: ITask;
  onTaskDateUpdate: (newDate: Nullable<Date>) => void;
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: 1,
    bgcolor: 'background.paper',
    color: 'text.secondary',
    '& svg': {
      m: 1.5,
    },
    '& hr': {
      mx: 0.5,
    },
  },
  date: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  dateTitle: {
    marginLeft: 10,
    marginRight: 10,
  },
  scheduleDialog: {
    padding: 5,
    borderRadius: 5,
  },
}));

export const TaskSectionHeader: FC<Props> = ({ task, onTaskDateUpdate }) => {
  const { dueDate, id } = task;
  const classes = useStyles();
  const isDateInThePast = DateUtils.isDateInThePast(dueDate);
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(
    dueDate as unknown as Date
  );

  const onDateSelect = async (dueDate: Nullable<Date>) => {
    setSelectedDate(dueDate);
    onTaskDateUpdate(dueDate);
    await TaskService.updateTaskDueDate(
      id,
      dayjs(dueDate as unknown as Date).format()
    );
  };

  return (
    <Box
      className={classes.root}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Row alignVerticalCenter>
        <Checkbox />
        <Divider orientation="vertical" flexItem />
        <Box
          className={classes.date}
          sx={{
            color: isDateInThePast ? colors.error.main : 'inherit',
          }}
        >
          <Row alignVerticalCenter>
            <CalendarTodayIcon color={'primary'} fontSize={'small'} />
            <Box className={classes.dateTitle}>
              <ScheduleDialog
                defaultDate={selectedDate!}
                onDateSelect={onDateSelect}
                className={classes.scheduleDialog}
              />
            </Box>
          </Row>
        </Box>
      </Row>
    </Box>
  );
};
