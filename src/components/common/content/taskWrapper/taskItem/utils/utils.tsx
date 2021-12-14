import DateUtils from '../../../../../../common/utils/dateUtils';
import colors from '../../../../../../common/styles/colors';

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
    return { title: 'Tomorrow', backgroundColor: 'orange', textColor: colors.white };
  }

  if (dayDifferences > 0) {
    return {
      title: `${dayDifferences} days ago`,
      backgroundColor: colors.reds['100'],
      textColor: 'red',
    };
  }
};

const TaskItemUtils = {
  getDateBadgeLabel,
};

export default TaskItemUtils;
