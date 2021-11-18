import { ITask } from '../../../../../common/types/tasks.types';
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
  task: Nullable<ITask>;
  onTaskUpdate: (task: ITask) => void;
  deselectTask: () => void;
};

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    width: '50%',
    borderLeft: `1px solid ${colors.greys['300']}`,
    height: '100vh',
    padding: 10,
  },
  divider: {
    padding: '10px 0',
  },
});

export const SelectedTaskSection: FC<Props> = ({
  task,
  onTaskUpdate,
  deselectTask,
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
    } as unknown as ITask);
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
        anchor={'right'}
      >
        <Box sx={{ p: 1 }}>
          <Row alignVerticalCenter>
            <ArrowBackIcon onClick={closeDrawer} />
            <TaskSectionHeader task={task} onTaskDateUpdate={onDateUpdate} />
          </Row>
          {renderContent()}
        </Box>
      </SwipeableDrawer>
    );
  }

  return (
    <div className={classes.root}>
      <TaskSectionHeader task={task} onTaskDateUpdate={onDateUpdate} />
      {renderContent()}
    </div>
  );
};
