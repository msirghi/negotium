import DateUtils from '../../../../../../common/utils/dateUtils';
import colors from '../../../../../../common/styles/colors';
import { TaskDateType } from '../../../../../../common/constants/enums';

const getDateBadgeLabel = (dueDate?: string) => {
  if (!dueDate) {
    return;
  }

  const isToday = DateUtils.isTodayDate(dueDate);
  if (isToday) {
    return {
      title: 'Today',
      backgroundColor: colors.primaries.lightBlue_1,
      textColor: colors.white,
    };
  }

  const dayDifferences = DateUtils.getDateDifference(dueDate);
  if (dayDifferences === 0) {
    return {
      title: 'Tomorrow',
      backgroundColor: 'orange',
      textColor: colors.white,
    };
  }

  if (dayDifferences > 0) {
    return {
      title: `${dayDifferences} days ago`,
      backgroundColor: colors.reds['100'],
      textColor: 'red',
    };
  }
};

const getColorByDateType = (type?: string) => {
  if (type === TaskDateType.PAST) {
    return colors.error.main;
  }
  if (type === TaskDateType.Today) {
    return colors.primaries.lightBlue_1;
  }
  return colors.greys['500'];
};

const TaskItemUtils = {
  getDateBadgeLabel,
  getColorByDateType,
};

export default TaskItemUtils;
