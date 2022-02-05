import { Task } from '../../../../../common/types/tasks.types';
import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Divider, SwipeableDrawer } from '@mui/material';
import { TaskSectionHeader } from '../header/TaskSectionHeader';
import { TaskSectionContent } from '../content/TaskSectionContent';
import { Row } from '../../../utilities/row/Row';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NotSelectedSection } from '../notSelected/NotSelectedSection';
import colors from '../../../../../common/styles/colors';
import { Nullable } from '../../../../../common/types/common.types';
import dayjs from 'dayjs';
import { useIsMobile } from '../../../../../common/hooks/common/useIsMobile';

type Props = {
  task: Nullable<Task>;
  onTaskUpdate: (task: Task, options?: { deselectTask: boolean }) => void;
  deselectTask: () => void;
  markAsDone: (id: Task['id']) => void;
};

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    width: '50%',
    borderLeft: `1px solid ${colors.greys['300']}`,
    height: '95vh',
    padding: 10,
  },
  divider: {
    padding: '10px 0',
  },
  drawer: {
    zIndex: 99999,
  },
});

export const SelectedTaskSection: FC<Props> = ({
  task,
  onTaskUpdate,
  deselectTask,
  markAsDone,
}) => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(!!task);
  }, [task]);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      deselectTask();
    }, 500);
  };

  if (!task && !isMobile) {
    return (
      <Box className={classes.root}>
        <NotSelectedSection />
      </Box>
    );
  }

  if (!task) {
    return <div />;
  }

  const onDateUpdate = (newDate: Nullable<Date>) => {
    onTaskUpdate({
      ...task,
      dueDate: newDate ? dayjs(newDate).format() : null,
    } as unknown as Task);
  };

  const handleDoneChange = () => {
    markAsDone(task.id);
  };

  const renderContent = () => {
    return (
      <>
        <Divider className={classes.divider} />
        <TaskSectionContent task={task!} onTaskUpdate={onTaskUpdate} />
      </>
    );
  };

  if (isMobile && task) {
    return (
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
        className={classes.drawer}
      >
        <Box sx={{ p: 1, width: '100vw' }}>
          <Row alignVerticalCenter>
            <ArrowBackIcon onClick={closeDrawer} />
            <TaskSectionHeader
              task={task}
              onTaskDateUpdate={onDateUpdate}
              key={task.dueDate}
              markTaskAsDone={handleDoneChange}
            />
          </Row>
          {renderContent()}
        </Box>
      </SwipeableDrawer>
    );
  }

  return (
    <div className={classes.root}>
      <TaskSectionHeader
        task={task}
        onTaskDateUpdate={onDateUpdate}
        key={task.dueDate}
        markTaskAsDone={handleDoneChange}
      />
      {renderContent()}
    </div>
  );
};
