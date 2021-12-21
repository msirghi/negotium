import { MainMenuItem, ProjectColor, SiteTheme } from './types';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/Inbox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DoneIcon from '@mui/icons-material/Done';
import { SnackbarOrigin } from 'notistack';
import colors from '../styles/colors';
import { Descendant } from 'slate';

export const MAIN_MENU_ITEMS: MainMenuItem[] = [
  {
    Icon: InboxIcon,
    title: 'pageTitles.inbox',
    route: '/home/inbox',
  },
  {
    Icon: StarBorderIcon,
    title: 'pageTitles.today',
    route: '/home/today',
  },
  {
    Icon: DateRangeIcon,
    title: 'pageTitles.upcoming',
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

export const BASE_API_URL_V1 = 'https://negotium-api.herokuapp.com/api/v1';

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

export const MENTION_ARRAY_KEYWORDS = ['Today', 'Tomorrow'];

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    title: 'English',
  },
  {
    code: 'ru',
    title: 'Russian',
  },
];

export const HOME_VIEW_LIST = [
  {
    title: 'Inbox',
    url: '/home/inbox',
  },
  {
    title: 'Today',
    url: '/home/today',
  },
];

export const TIME_FORMATS = [
  {
    title: '13:00',
    key: '24h',
  },
  {
    title: '1pm',
    key: 'am/pm',
  },
];

export const tempAccountInfo = {
  id: '1',
  email: 'mihail.sirghi@gmail.com',
  name: 'Mihail',
};

export const pagesWithoutWrapper = ['/login', '/registration'];

export const passwordStatusColors = {
  tooWeak: 'red',
  weak: 'orange',
  medium: 'purple',
  strong: 'green',
};

export const siteThemes: SiteTheme[] = [
  {
    color: colors.primaries.lightBlue_1,
    label: 'Default',
    internalKey: 'default',
  },
  {
    color: colors.black,
    label: 'Noir',
    internalKey: 'noir',
  },
];

export const initialRichTextValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const ACTIVATION_CODE_VAR_NAME = 'ac';
