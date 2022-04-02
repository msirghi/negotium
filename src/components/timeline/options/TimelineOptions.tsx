import { Nullable } from '../../../common/types/common.types';
import { Row } from '../../common/utilities/row/Row';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TodayIcon from '@mui/icons-material/Today';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../../atoms/showCompleted/showCompleted.atom';
import useTranslation from "next-translate/useTranslation";

type Props = {
  onTaskAdd: (title: string, date: Nullable<Date>) => void;
};

export const TimelineOptions = ({ onTaskAdd }: Props) => {
  const [showCompleted, setShowCompleted] = useAtom(showCompletedAtom);
  const { t } = useTranslation('timeline');

  const handleShowTask = () => setShowCompleted(!showCompleted);

  const scrollToToday = () => {
    document.getElementById('today')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Row alignVerticalCenter>
      <TaskAddButton onTaskAdd={onTaskAdd} />
      <Tooltip title={t('scrollToToday')}>
        <IconButton style={{ marginTop: 10 }} size={'small'}>
          <TodayIcon color={'primary'} onClick={scrollToToday} />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('showCompleted')}>
        <Checkbox checked={showCompleted} onChange={handleShowTask} style={{ marginTop: 10 }} color={'primary'} size={'small'} />
      </Tooltip>
    </Row>
  );
};
