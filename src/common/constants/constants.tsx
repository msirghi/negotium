import { MainMenuItem } from './types';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/Inbox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DoneIcon from '@mui/icons-material/Done';

export const MAIN_MENU_ITEMS: MainMenuItem[] = [
  {
    Icon: InboxIcon,
    title: 'Inbox',
  },
  {
    Icon: StarBorderIcon,
    title: 'Today',
  },
  {
    Icon: DateRangeIcon,
    title: 'Upcoming',
  },
  {
    Icon: DoneIcon,
    title: 'Completed',
  },
];

export const PROJECT_NAME = 'Negotium';

export const BASE_API_URL = 'http://localhost:3000/api';
