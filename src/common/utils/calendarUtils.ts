import { Task } from '../types/tasks.types';
import { CalendarEvent } from '../types/calendar.types';
import { Theme } from '@mui/material';
import colors from '../styles/colors';

const convertTasksToEvents = (tasks: Task[]): CalendarEvent[] => {
  return tasks.map(({ title, dueDate, id }) => ({ id, start: dueDate, title }));
};

const updateCalendarStyles = (theme: Theme) => {
  document.querySelectorAll('.fc-theme-standard .fc-list-day-cushion').forEach((el) => {
    const element = el as HTMLDivElement;
    element.style.backgroundColor = theme.palette.primary.main;
    element.style.color = colors.white;
    element.style.borderRadius = '5px';
  });
};

const CalendarUtils = {
  convertTasksToEvents,
  updateCalendarStyles,
};

export default CalendarUtils;
