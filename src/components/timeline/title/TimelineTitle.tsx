import { makeStyles } from '@mui/styles';
import { FC } from 'react';

const useStyles = makeStyles({
  title: {
    fontSize: 18,
  },
});

type Props = {
  title: string;
};

export const TimelineTitle: FC<Props> = ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <p className={classes.title}>{title}</p>
    </>
  );
};
