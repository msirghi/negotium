import { FC, MouseEvent, useState } from 'react';
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
import { ProjectSettingsOption } from '../../../../../common/constants/enums';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../../../../atoms/showCompleted/showCompleted.atom';
import { useTranslation } from 'next-i18next';

type Props = {
  onClick: (option: ProjectSettingsOption) => void;
};

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

export const ProjectOptions: FC<Props> = ({ onClick }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isCompletedShown] = useAtom(showCompletedAtom);
  const { t } = useTranslation('common');

  const onDeleteClick = () => {
    handleClose();
    setDeleteDialogOpen(true);
  };

  const onProjectDelete = async () => {
    const projectId = router.query.id as string;
    ProjectService.deleteProjectById(projectId);
    dispatch(removeProjectFromList(projectId));
    enqueueSnackbar(t('snackbarTitles.projectDeleted'), {
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

  const handleOptionClick = (option: ProjectSettingsOption) => {
    return () => onClick(option);
  };

  return (
    <div>
      <DeleteProjectDialog open={isDeleteDialogOpen} setOpen={setDeleteDialogOpen} onSubmit={onProjectDelete} />
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
        <MenuItem onClick={handleOptionClick(ProjectSettingsOption.SHOW_COMPLETED)} className={classes.menuItem}>
          <Row alignVerticalCenter>
            <DoneIcon fontSize={'small'} color={isCompletedShown ? 'info' : 'inherit'} />
            <span className={classes.menuItemTitle}>{`${isCompletedShown ? t('common.hide') : t('common.show')} ${t('completed')}`}</span>
          </Row>
        </MenuItem>

        <MenuItem data-testid={'delete-item'} onClick={onDeleteClick} className={classes.menuItem}>
          <Row alignVerticalCenter>
            <DeleteOutlineOutlinedIcon color={'error'} fontSize={'small'} />
            <span className={classes.menuItemTitle}>{t('common.delete')}</span>
          </Row>
        </MenuItem>
      </Menu>
    </div>
  );
};
