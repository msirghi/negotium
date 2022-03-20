import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  title: string;
};

export const HeaderLink: FC<Props> = ({ title }) => {
  return (
    <Box style={{ padding: '0 10px' }}>
      <Button color={'inherit'}>{title}</Button>
    </Box>
  );
};
