import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import MenuSkeleton from '../skeleton/MenuSkeleton';
import { SiteWrapperList } from '../';
import { ListItemTitle } from '../listItemTitle/ListItemTitle';
import { useFetchProjects } from '../../../../../common/hooks/projects/useFetchProjects';
import { useEffect, useState } from 'react';
import { ProjectDialog } from '../wrapper/projectDialog/ProjectDialog';
import { IProject } from '../../../../../common/types/projects.types';
import ProjectService from '../../../../../services/ProjectService';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import colors from '../../../../../common/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectsList } from '../../../../../redux/projects/projectsSlice';
import { RootState } from '../../../../../redux/store';
import SmoothList from 'react-smooth-list';
import { ProjectListMoreItem } from './more/ProjectListMoreItem';
import { MAX_PROJECT_LIST_COUNT } from '../../../../../common/constants/constants';

const useStyles = makeStyles({
  activeItem: {
    backgroundColor: colors.primaries.lightBlue_1,
    color: colors.white,
    borderRadius: 10,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      backgroundColor: colors.primaries.lightBlue_1,
    },
  },
  activeIcon: {
    color: colors.white,
  },
});

export const SiteWrapperProjectsList = () => {
  const { isLoading, data, refetch } = useFetchProjects();
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);
  const projectsFromStore = useSelector(
    (state: RootState) => state.projects.projects
  );

  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setProjects(data);
      dispatch(setProjectsList(data));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [projectsFromStore]);

  const openDialog = () => setProjectDialogOpen(true);

  const onSubmit = async (name: IProject['name']) => {
    await ProjectService.addProject({ name });
    await refetch();
  };

  const onProjectClick = (id: string) => {
    router.push(`/home/projects/${id}`);
  };

  const isProjectActive = (projectId: string) => {
    const { id } = router.query;
    return String(id) === String(projectId);
  };

  const toggleShowAll = () => setShowAll(!showAll);

  if (isLoading || !data) {
    return <MenuSkeleton />;
  }

  return (
    <>
      <ProjectDialog
        dialogTitle={'Add project'}
        onSubmit={onSubmit}
        open={isProjectDialogOpen}
        setOpen={setProjectDialogOpen}
      />
      <SiteWrapperList
        title={'Projects'}
        options={{ addOptions: { onClick: openDialog } }}
      >
        <SmoothList>
          <List sx={{ padding: 1 }} data-testid={'projects-list'}>
            {projects
              .slice(0, showAll ? projects.length : MAX_PROJECT_LIST_COUNT)
              .map((project) => {
                const isActive = isProjectActive(project.id);
                return (
                  <ListItem
                    button
                    sx={{ borderRadius: 10 }}
                    className={isActive ? classes.activeItem : ''}
                    key={project.id}
                    onClick={() => onProjectClick(project.id)}
                  >
                    <ListItemIcon>
                      <ReorderIcon
                        fontSize={'small'}
                        className={isActive ? classes.activeIcon : ''}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<ListItemTitle title={project.name} />}
                    />
                  </ListItem>
                );
              })}
          </List>
          {projects.length > MAX_PROJECT_LIST_COUNT && <ProjectListMoreItem toggleShowAll={toggleShowAll} showAll={showAll}/>}
        </SmoothList>
      </SiteWrapperList>
    </>
  );
};
