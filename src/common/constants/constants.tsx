import { MainMenuItem } from './types';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/Inbox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DoneIcon from '@mui/icons-material/Done';
import { SnackbarOrigin } from 'notistack';

export const MAIN_MENU_ITEMS: MainMenuItem[] = [
  {
    Icon: InboxIcon,
    title: 'Inbox',
    route: '/home/inbox',
  },
  {
    Icon: StarBorderIcon,
    title: 'Today',
    route: '/home/today',
  },
  {
    Icon: DateRangeIcon,
    title: 'Upcoming',
    route: '/home/upcoming',
  },
  {
    Icon: DoneIcon,
    title: 'Completed',
    route: '/home/completed',
  },
];

export const PROJECT_NAME = 'Negotium';

export const BASE_API_URL = 'http://localhost:4000';

export const SNACKBAR_POSITIONS: { [key: string]: SnackbarOrigin } = {
  BOTTOM_CENTER: { horizontal: 'center', vertical: 'bottom' },
};
