import { FC } from 'react';
import { Typography } from '@mui/material';
import colors from '../../../../../common/styles/colors';

type Props = {
  title?: string;
};

export const SiteWrapperList: FC<Props> = ({ children, title }) => {
  return (
    <div>
      {title && (
        <Typography
          data-testid="site-wrapper-title"
          sx={{
            marginLeft: 10,
            marginTop: 4,
            fontSize: 11,
            textTransform: 'uppercase',
          }}
          color={colors.greys['500']}
        >
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
