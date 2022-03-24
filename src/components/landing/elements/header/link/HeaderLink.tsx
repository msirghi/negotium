import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  title: string;
  onClick: () => void;
};

export const HeaderLink: FC<Props> = ({ title, onClick }) => {
  return (
    <Box style={{ padding: '0 10px' }}>
      <Button color={'inherit'} onClick={onClick}>{title}</Button>
    </Box>
  );
};
