import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../../../atoms/showCompleted/showCompleted.atom';
import { TaskAddDialog } from './dialog/TaskAddDialog';
import useTranslation from 'next-translate/useTranslation';

export const TaskAdd = () => {
  const [taskDialogOpened, setTaskDialogOpened] = useAtom(showCompletedAtom);
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
