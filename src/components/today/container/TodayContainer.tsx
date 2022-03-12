import DateUtils from '../../../common/utils/dateUtils';
import useTranslation from 'next-translate/useTranslation';
import { InboxContainer } from '../../inbox';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../../redux/selectors/tasks.selectors';

export const TodayContainer = () => {
  const tasks = useSelector(tasksSelector);
  const { t } = useTranslation('common');

  return (
    <InboxContainer
      title={t('pageTitles.today')}
      subtitle={t('pageTitles.today')}
      predefinedTasks={tasks.filter(({ dueDate, completed }) => DateUtils.isTodayDate(dueDate) && !completed)}
    />
  );
};
