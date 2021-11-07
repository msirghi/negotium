import { FC } from 'react';
import { Typography } from '@mui/material';
import { PROJECT_NAME } from '../../../../../common/constants/constants';
import colors from '../../../../../common/styles/colors';

type Props = {
  title: string;
};

const fontSize = 12;

export const UpperHeader: FC<Props> = ({ title }) => {
  return (
    <Typography fontSize={fontSize}>
      <Typography
        fontSize={fontSize}
        color={colors.primaries.lightBlue_1}
        component={'span'}
      >
        {PROJECT_NAME}
      </Typography>{' '}
      - {title}
    </Typography>
  );
};
