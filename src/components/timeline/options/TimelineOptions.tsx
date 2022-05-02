import { Nullable } from '../../../common/types/common.types';
import { Row } from '../../common/utilities/row/Row';
import { TaskAddButton } from '../../common/content/taskWrapper/section/taskAdd/TaskAddButton';
import TodayIcon from '@mui/icons-material/Today';
import {Checkbox, IconButton, Tooltip} from '@mui/material';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../../atoms/showCompleted/showCompleted.atom';
import useTranslation from 'next-translate/useTranslation';
import GridViewIcon from '@mui/icons-material/GridView';
import { TimelineView } from '../../../common/constants/enums';
import {makeStyles} from "@mui/styles";

type Props = {
  onTaskAdd: (title: string, date: Nullable<Date>) => void;
  onViewSwitch: () => void;
  currentView: TimelineView;
};

const useStyles = makeStyles({
  optionsContainer: {
    justifyContent: 'flex-end !important'
  }
});

export const TimelineOptions = ({ onTaskAdd, onViewSwitch, currentView }: Props) => {
  const [showCompleted, setShowCompleted] = useAtom(showCompletedAtom);
  const { t } = useTranslation('timeline');
  const classes = useStyles();
  const isListView = currentView === TimelineView.LIST;

  const handleShowTask = () => setShowCompleted(!showCompleted);

  const scrollToToday = () => {
    document.getElementById('today')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onChangeViewClick = () => {
    setShowCompleted(false);
    onViewSwitch();
  };

  return (
    <>
      <TaskAddButton onTaskAdd={onTaskAdd} />
      <Row alignVerticalCenter className={classes.optionsContainer} fullWidth>
        <Tooltip title={t('scrollToToday')}>
          <IconButton style={{ marginTop: 10 }} size={'small'} disabled={isListView}>
            <TodayIcon color={'primary'} onClick={scrollToToday} />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('showCompleted')}>
          <Checkbox
            disabled={isListView}
            checked={showCompleted}
            onChange={handleShowTask}
            style={{ marginTop: 10 }}
            color={'primary'}
            size={'small'}
          />
        </Tooltip>

        <Tooltip title={t('switchView')}>
          <IconButton style={{ marginTop: 10 }} size={'small'}>
            <GridViewIcon id="change-view-btn" color={'primary'} onClick={onChangeViewClick} />
          </IconButton>
        </Tooltip>
      </Row>
    </>
  );
};
