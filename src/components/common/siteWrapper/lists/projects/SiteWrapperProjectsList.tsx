import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem } from '@mui/material';
import MenuSkeleton from '../skeleton/MenuSkeleton';
import { SiteWrapperList } from '../';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';
import { useFetchProjects } from '../../../../../common/hooks/projects/useFetchProjects';
import { useEffect, useState } from 'react';
import { ProjectDialog } from '../wrapper/projectDialog/ProjectDialog';
import { Project } from '../../../../../common/types/projects.types';
import ProjectService from '../../../../../services/ProjectService';
import router from 'next/router'
import { makeStyles } from '@mui/styles';
import colors from '../../../../../common/styles/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import SmoothList from 'react-smooth-list';
import { ProjectListMoreItem } from './more/ProjectListMoreItem';
import { MAX_PROJECT_LIST_COUNT } from '../../../../../common/constants/constants';
import useTranslation from 'next-translate/useTranslation';
import { Theme, useTheme } from '@mui/system';
import CircleIcon from '@mui/icons-material/Circle';

const useStyles = makeStyles({
  activeItem: {
    backgroundColor: (props: { theme: Theme }) => props.theme.palette.custom.menuIconBackground,
    // colors.greys['300'],
    color: colors.white,
    borderRadius: 10,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      backgroundColor: (props: { theme: Theme }) => props.theme.palette.custom.menuIconBackground,
    },
  },
  activeIcon: {
    color: colors.white,
  },
});

export const SiteWrapperProjectsList = () => {
  const { fetchProjects, loading } = useFetchProjects();
  const { t } = useTranslation('common');
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [showAll, setShowAll] = useState(false);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    if (!projects){
      fetchProjects();
    }
  }, []);

  const openDialog = () => setProjectDialogOpen(true);

  const onSubmit = async (name: Project['name'], color: Project['color']) => {
    await ProjectService.addProject({ name, color });
    await fetchProjects();
  };

  const onProjectClick = (id: string) => {
    router.push(`/home/projects?id=${id}`);
  };

  const isProjectActive = (projectId: string) => {
    const { id } = router.query;
    return String(id) === String(projectId);
  };

  const toggleShowAll = () => setShowAll(!showAll);

  if (loading && !projects) {
    return <MenuSkeleton />;
  }

  const handleProjectClick = (projectId: Project['id']) => {
    return () => onProjectClick(projectId);
  };

  return (
    <>
      <ProjectDialog
        dialogTitle={t('mainMenuList.addProject')}
        onSubmit={onSubmit}
        open={isProjectDialogOpen}
        setOpen={setProjectDialogOpen}
      />
      <SiteWrapperList title={'Projects'} options={{ addOptions: { onClick: openDialog } }}>
        <SmoothList>
          <List sx={{ padding: 1 }} data-testid={'projects-list'}>
            {projects.slice(0, showAll ? projects.length : MAX_PROJECT_LIST_COUNT).map((project) => {
              const isActive = isProjectActive(project.id);
              return (
                <ListItem
                  button
                  sx={{ borderRadius: 3 }}
                  className={isActive ? classes.activeItem : ''}
                  key={project.id}
                  onClick={handleProjectClick(project.id)}
                >
                  <ListItemIcon>
                    <CircleIcon style={{ color: project.color, fontSize: 13 }} className={isActive ? classes.activeIcon : ''} />
                  </ListItemIcon>
                  <ListItemText primary={<ListItemTitle title={project.name} />} />
                </ListItem>
              );
            })}
          </List>
          {projects.length > MAX_PROJECT_LIST_COUNT && <ProjectListMoreItem toggleShowAll={toggleShowAll} showAll={showAll} />}
        </SmoothList>
      </SiteWrapperList>
    </>
  );
};
