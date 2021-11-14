import { FC } from 'react';
import { Box } from '@mui/system';
import { Checkbox, Divider } from '@mui/material';
import { ITask } from '../../../../../common/types/tasks.types';
import { Row } from '../../../utilities/row/Row';
import { makeStyles } from '@mui/styles';
import DateUtils from '../../../../../common/utils/dateUtils';
import colors from '../../../../../common/styles/colors';
import dayjs from 'dayjs';
import { If } from '../../../utilities/if/If';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

type Props = {
  task: ITask;
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
}));

export const TaskSectionHeader: FC<Props> = ({ task }) => {
  const { dueDate } = task;
  const classes = useStyles();
  const isDateInThePast = DateUtils.isDateInThePast(dueDate);

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
              <If condition={!dueDate}>Due date</If>
              <If condition={!!dueDate}>
                {isDateInThePast
                  ? `${DateUtils.getDateDifference(
                      dueDate!
                    )} day(s) ago, ${dayjs(dueDate).format('DD.MM.YYYY')}`
                  : dayjs(dueDate).format('DD.MM.YYYY')}
              </If>
            </Box>
          </Row>
        </Box>
      </Row>
    </Box>
  );
};
