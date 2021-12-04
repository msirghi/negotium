import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';
import { useRouter } from 'next/router';
import { Box, Theme, useTheme } from '@mui/system';
import colors from '../../../../../common/styles/colors';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles(() => ({
  activeItem: {
    backgroundColor: (props: { theme: Theme }) =>
      props.theme.palette.custom.menuIconBackground,
    color: colors.white,
    borderRadius: 10,
    transition: 'all .1s ease-in-out',
  },
  activeIcon: {
    color: colors.white,
  },
}));

export const SiteWrapperMainList = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles({ theme });

  const isActive = (route: string) => {
    return router.route.includes(route.toLowerCase());
  };

  const onItemClick = (route: string) => {
    router.push(route);
  };

  return (
    <List sx={{ padding: 1 }}>
      {MAIN_MENU_ITEMS.map((item) => ({ ...item, title: t(item.title) })).map(
        ({ Icon, title, route }) => {
          const isItemActive = isActive(route);
          return (
            <Box
              key={title}
              className={isItemActive ? classes.activeItem : ''}
              sx={{ borderRadius: 15 }}
            >
              <ListItem
                button
                onClick={() => onItemClick(route)}
                sx={{ borderRadius: 5 }}
              >
                <ListItemIcon>
                  <Icon
                    fontSize={'small'}
                    className={isItemActive ? classes.activeIcon : ''}
                  />
                </ListItemIcon>
                <ListItemText primary={<ListItemTitle title={title} />} />
              </ListItem>
            </Box>
          );
        }
      )}
    </List>
  );
};
