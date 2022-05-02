import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Task } from '../../../common/types/tasks.types';
import CalendarUtils from '../../../common/utils/calendarUtils';
import { EventClickArg } from '@fullcalendar/common';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

type Props = {
  tasks: Task[];
  onTaskClick: (id: Task['id']) => void;
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
  },
});

export const ListCalendar = ({ tasks, onTaskClick }: Props) => {
  const theme = useTheme();
  const classes = useStyles();

  const onEventClick = (arg: EventClickArg) => {
    onTaskClick(arg.event.id);
  };

  useEffect(() => {
    CalendarUtils.updateCalendarStyles(theme);
  }, [theme]);

  return (
    <div id="calendar" className={classes.container}>
      <FullCalendar
        displayEventTime={false}
        eventClick={onEventClick}
        headerToolbar={{ left: '', right: '' }}
        // @ts-ignore
        events={CalendarUtils.convertTasksToEvents(tasks)}
        initialView="listWeek"
        plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
        selectable
      />
    </div>
  );
};
