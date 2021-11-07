import { FC } from 'react';
import { Typography } from '@mui/material';

type Props = {
  title: string;
};

export const ListItemTitle: FC<Props> = ({ title }) => {
  return <Typography sx={{ fontSize: 14 }}>{title}</Typography>;
};
