import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, Fade } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import MenuSkeleton from '../skeleton/MenuSkeleton';
import { SiteWrapperList } from '../';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';
import { useFetchProjects } from '../../../../../common/hooks/projects/useFetchProjects';

export const SiteWrapperProjectsList = () => {
  const { isLoading, data } = useFetchProjects();

  if (isLoading || !data) {
    return <MenuSkeleton />;
  }

  return (
    <SiteWrapperList title={'Projects'}>
      <Fade in>
        <List sx={{ padding: 1 }} data-testid={'projects-list'}>
          {data.map((project) => {
            return (
              <ListItem button key={project.id}>
                <ListItemIcon>
                  <ReorderIcon fontSize={'small'} />
                </ListItemIcon>
                <ListItemText
                  primary={<ListItemTitle title={project.name} />}
                />
              </ListItem>
            );
          })}
        </List>
      </Fade>
    </SiteWrapperList>
  );
};
