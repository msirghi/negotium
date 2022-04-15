import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { TaskAddDialog } from './dialog/TaskAddDialog';
import useTranslation from 'next-translate/useTranslation';
import { showTaskDialog } from '../../../../atoms/taskDialogOpened/taskDialogOpened.atom';

export const TaskAdd = () => {
  const [taskDialogOpened, setTaskDialogOpened] = useAtom(showTaskDialog);
  const { t } = useTranslation('common');

  const toggleDialog = () => setTaskDialogOpened(!taskDialogOpened);

  return (
    <>
      <Tooltip title={t('inputPlaceholders.addTask')}>
        <IconButton color="inherit" onClick={toggleDialog}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <TaskAddDialog open={taskDialogOpened} handleClose={toggleDialog} />
    </>
  );
};
