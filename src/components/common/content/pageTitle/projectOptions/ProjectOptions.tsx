import { FC, useState, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Row } from '../../../utilities/row/Row';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { makeStyles } from '@mui/styles';
import { DeleteProjectDialog } from '../../../dialogs/projects/DeleteProjectDialog';
import { useRouter } from 'next/router';
import ProjectService from '../../../../../services/ProjectService';
import { useDispatch } from 'react-redux';
import { removeProjectFromList } from '../../../../../redux/projects/projectsSlice';
import { useSnackbar } from 'notistack';
import { SNACKBAR_POSITIONS } from '../../../../../common/constants/constants';
import DoneIcon from '@mui/icons-material/Done';

type Props = {};

const useStyles = makeStyles({
  menu: {
    marginTop: 35,
  },
  menuItem: {
    minWidth: 200,
  },
  menuItemTitle: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export const ProjectOptions: FC<Props> = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onDeleteClick = () => {
    handleClose();
    setDeleteDialogOpen(true);
  };

  const onProjectDelete = async () => {
    const projectId = router.query.id as string;
    ProjectService.deleteProjectById(projectId);
    dispatch(removeProjectFromList(projectId));
    enqueueSnackbar('Project deleted', {
      anchorOrigin: SNACKBAR_POSITIONS.BOTTOM_CENTER,
    });
    await router.push('/home/inbox');
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <DeleteProjectDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onSubmit={onProjectDelete}
      />
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        className={classes.menu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onDeleteClick} className={classes.menuItem}>
          <Row alignVerticalCenter>
            <DoneIcon fontSize={'small'} />
            <span className={classes.menuItemTitle}>Show completed</span>
          </Row>
        </MenuItem>

        <MenuItem data-testid={'delete-item'} onClick={onDeleteClick} className={classes.menuItem}>
          <Row alignVerticalCenter>
            <DeleteOutlineOutlinedIcon color={'error'} fontSize={'small'} />
            <span className={classes.menuItemTitle}>Delete</span>
          </Row>
        </MenuItem>
      </Menu>
    </div>
  );
};
