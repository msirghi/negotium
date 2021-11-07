import { FC } from 'react';
import { Typography } from '@mui/material';

type Props = {
  title: string;
  className?: string;
};

export const ListItemTitle: FC<Props> = ({ title, className }) => {
  return <Typography sx={{ fontSize: 14 }} className={className}>{title}</Typography>;
};
