import { FC } from 'react';
import { useLandingSectionStyles } from './styles';
import { Box } from '@mui/system';

type Props = {
  backgroundColor: string;
  textColor?: string;
  styles?: object;
  className: string;
};

export const LandingSection: FC<Props> = ({ className, styles = {}, backgroundColor, children, textColor }) => {
  const classes = useLandingSectionStyles();

  return (
    // @ts-ignore
    <Box style={{ background: backgroundColor, color: textColor || '#fff', ...styles }} className={[className, classes.container]}>
      {children}
    </Box>
  );
};
