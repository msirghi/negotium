import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { Task } from '../../../common/types/tasks.types';
import { TaskDateType } from '../../../common/constants/enums';
import { useTheme } from '@mui/system';
import colors from '../../../common/styles/colors';

const useStyles = makeStyles({
  title: (props: { color: string }) => ({
    fontSize: 16,
    color: props.color,
  }),
});

type Props = {
  title: string;
  dateType: Task['dueDate'];
};

export const TimelineTitle: FC<Props> = ({ title, dateType }) => {
  const isInThePast = dateType === TaskDateType.PAST;
  const theme = useTheme();
  const classes = useStyles({ color: isInThePast ? theme.palette.error.main : colors.black });

  return <p className={classes.title}>{title}</p>;
};
