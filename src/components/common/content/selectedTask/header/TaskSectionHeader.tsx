import { FC, useEffect, useState } from 'react';
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
import { NullableDate } from '../../../../../common/types/common.types';
import TaskService from '../../../../../services/TaskService';

type Props = {
  task: ITask;
  onTaskDateUpdate: (newDate: NullableDate) => void;
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
  },
  test: {
    padding: 5,
    borderRadius: 5,
  },
}));

export const TaskSectionHeader: FC<Props> = ({ task, onTaskDateUpdate }) => {
  const { dueDate, id } = task;
  const classes = useStyles();
  const isDateInThePast = DateUtils.isDateInThePast(dueDate);
  const [selectedDate, setSelectedDate] = useState<NullableDate>(dueDate);

  const onDateSelect = async (dueDate: NullableDate) => {
    setSelectedDate(dueDate as NullableDate);
    onTaskDateUpdate(dueDate);
    await TaskService.updateTaskDueDate(
      id,
      dayjs(dueDate as unknown as Date).format()
    );
  };

  // let title = '';
  //
  // if (selectedDate && !DateUtils.isTodayDate(dueDate)) {
  //   title = isDateInThePast
  //     ? `${DateUtils.getDateDifference(dueDate!)} day(s) ago, ${dayjs(
  //         dueDate
  //       ).format('DD.MM.YYYY')}`
  //     : dayjs(dueDate).format('DD.MM.YYYY');
  // }

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
                defaultDate={selectedDate}
                onDateSelect={onDateSelect}
                className={classes.test}
              />
            </Box>
          </Row>
        </Box>
      </Row>
    </Box>
  );
};
