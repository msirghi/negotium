import { FC } from 'react';
import { useCommonStyles } from '../../../styles';
import { Box } from '@mui/system';

type Props = {
  title: string;
};

export const GeneralSettingsSection: FC<Props> = ({ title, children }) => {
  const commonClasses = useCommonStyles();

  return (
    <>
      <Box className={commonClasses.sectionTitle}>{title}</Box>
      <Box className={commonClasses.sectionBody}>{children}</Box>
    </>
  );
};
