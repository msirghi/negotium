import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';
import styles from './SiteWrapperMainList.module.scss';
import { useRouter } from 'next/router';

export const SiteWrapperMainList = () => {
  const router = useRouter();

  const isActive = (title: string) => {
    return router.route.includes(title.toLowerCase());
  };

  return (
    <List sx={{ padding: 1 }}>
      {MAIN_MENU_ITEMS.map(({ Icon, title }) => {
        return (
          <ListItem button key={title}>
            <ListItemIcon>
              <Icon
                fontSize={'small'}
                className={isActive(title) ? styles.activeItem : ''}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <ListItemTitle
                  className={isActive(title) && styles.activeItem}
                  title={title}
                />
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};
