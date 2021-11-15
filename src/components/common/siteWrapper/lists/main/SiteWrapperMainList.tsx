import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';
import styles from './SiteWrapperMainList.module.scss';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import colors from '../../../../../common/styles/colors';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  activeItem: {
    backgroundColor: colors.primaries.lightBlue_1,
    color: colors.white,
    borderRadius: 10,
    transition: 'all .1s ease-in-out',
  },
  activeIcon: {
    color: colors.white,
  },
});

export const SiteWrapperMainList = () => {
  const router = useRouter();
  const classes = useStyles();

  const isActive = (route: string) => {
    return router.route.includes(route.toLowerCase());
  };

  const onItemClick = (route: string) => {
    router.push(route);
  };

  return (
    <List sx={{ padding: 1 }}>
      {MAIN_MENU_ITEMS.map(({ Icon, title, route }) => {
        const isItemActive = isActive(route);
        return (
          <Box
            key={title}
            className={isItemActive ? classes.activeItem : ''}
            sx={{ borderRadius: 15 }}
          >
            <ListItem button onClick={() => onItemClick(route)}>
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
      })}
    </List>
  );
};
