import {Task} from "./tasks.types";

export type CalendarEvent = {
  id: string;
  title: string;
  start: Task['dueDate'];
  backgroundColor?: string;
  borderColor?: string;
};
