import DateUtils from '../../../common/utils/dateUtils';
import SortUtils from '../../../common/utils/sortUtils';
import { InboxContainer } from '../../inbox';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../../redux/selectors/tasks.selectors';

export const UpcomingContainer = () => {
  const tasks = useSelector(tasksSelector);
  const { t } = useTranslation('common');

  if (!tasks.length) {
    return <div />;
  }

  return (
    <InboxContainer
      title={t('pageTitles.upcoming')}
      subtitle={t('pageTitles.upcoming')}
      predefinedTasks={SortUtils.sortTasksByDate(tasks).filter(
        ({ dueDate, completed }) => !DateUtils.isTodayDate(dueDate!) && DateUtils.getDateDifference(dueDate!) < 1 && !completed
      )}
    />
  );
};
