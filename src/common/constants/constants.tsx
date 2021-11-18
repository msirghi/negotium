import { MainMenuItem, ProjectColor } from './types';
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
  // {
  //   Icon: DoneIcon,
  //   title: 'Completed',
  //   route: '/home/completed',
  // },
];

export const PROJECT_NAME = 'Negotium';

export const BASE_API_URL = 'http://localhost:4000';

export const MAX_PROJECT_LIST_COUNT = 5;

export const SNACKBAR_POSITIONS: { [key: string]: SnackbarOrigin } = {
  BOTTOM_CENTER: { horizontal: 'center', vertical: 'bottom' },
};

export const PROJECT_COLORS: ProjectColor[] = [
  {
    color: 'rgb(219, 64, 53)',
    name: 'Red',
  },
  {
    color: 'rgb(255, 153, 51)',
    name: 'Orange',
  },

  {
    color: 'rgb(250, 208, 0)',
    name: 'Yellow',
  },
];
