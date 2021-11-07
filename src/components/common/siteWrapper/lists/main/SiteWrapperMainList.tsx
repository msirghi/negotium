import { List, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MAIN_MENU_ITEMS } from '../../../../../common/constants/constants';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';

export const SiteWrapperMainList = () => {
  return (
    <List sx={{ padding: 1 }}>
      {MAIN_MENU_ITEMS.map(({ Icon, title }) => {
        return (
          <ListItem button key={title}>
            <ListItemIcon>
              <Icon fontSize={'small'} />
            </ListItemIcon>
            <ListItemText primary={<ListItemTitle title={title} />} />
          </ListItem>
        );
      })}
    </List>
  );
};
