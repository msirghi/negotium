import { FC } from 'react';
import { IPredefinedOption, PREDEFINED_CODES } from './types';
import TodayIcon from '@mui/icons-material/Today';
import Filter1Icon from '@mui/icons-material/Filter1';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../../../../../utilities/row/Row';
import { Divider, List, ListItem } from '@mui/material';
import colors from '../../../../../../../../../common/styles/colors';
import PredefinedOptionsUtils from './utils';
import DateUtils from '../../../../../../../../../common/utils/dateUtils';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { CommonDateProps } from '../types';
import { NullableDate } from '../../../../../../../../../common/types/common.types';
import dayjs from 'dayjs';

const iconItems: IPredefinedOption[] = [
  {
    Icon: TodayIcon,
    title: 'Today',
    code: PREDEFINED_CODES.TODAY,
  },
  {
    Icon: Filter1Icon,
    title: 'Tomorrow',
    code: PREDEFINED_CODES.TOMORROW,
  },
];

const useStyles = makeStyles({
  itemTitle: {
    marginLeft: 10,
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: `${colors.greys['100']} !important`,
    },
  },
  divider: {
    marginTop: 5,
  },
  dayName: {
    marginLeft: 'auto',
    color: colors.greys[600],
    fontSize: 13,
  },
});

export const PredefinedOptions: FC<CommonDateProps> = ({
  onDatePick,
  selectedDate,
}) => {
  const classes = useStyles();

  const isDateSelected = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    const modifiedSelectedDate = dayjs(
      selectedDate as unknown as Date
    ).toDate();
    modifiedSelectedDate.setHours(0, 0, 0);
    return dayjs(modifiedSelectedDate).isSame(date);
  };

  return (
    <div>
      <List>
        {iconItems.map(({ Icon, title, code }) => {
          const date = PredefinedOptionsUtils.getDateForOption(code);
          const isSelected = isDateSelected(date);
          return (
            <ListItem
              style={{
                backgroundColor: isSelected ? colors.greys[200] : colors.white,
              }}
              key={code}
              className={classes.row}
              onClick={() => onDatePick(date as unknown as NullableDate)}
            >
              <Row alignVerticalCenter fullWidth>
                <Icon color={'primary'} fontSize={'small'} />
                <div className={classes.itemTitle}>{title}</div>
                <div className={classes.dayName}>
                  {DateUtils.getWeekDay(date)}
                </div>
              </Row>
            </ListItem>
          );
        })}
        {selectedDate && (
          <ListItem
            className={classes.row}
            onClick={() => onDatePick(null as unknown as NullableDate)}
          >
            <Row alignVerticalCenter>
              <RotateLeftIcon />
              <div className={classes.itemTitle}>No date</div>
            </Row>
          </ListItem>
        )}
      </List>
      <Divider className={classes.divider} />
    </div>
  );
};
