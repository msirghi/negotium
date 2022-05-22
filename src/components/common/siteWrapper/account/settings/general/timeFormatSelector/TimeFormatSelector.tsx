import { MenuItem, TextField } from '@mui/material';
import { TIME_FORMATS } from '../../../../../../../common/constants/constants';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';

type Props = {
  className: string;
};

export const TimeFormatSelector = ({ className }: Props) => {
  const isMobile = useIsMobile();

  return (
    <TextField select value={'24h'} size={'small'} className={className} fullWidth={isMobile}>
      {TIME_FORMATS.map(({ title, key }) => {
        return (
          <MenuItem key={key} value={key}>
            {title}
          </MenuItem>
        );
      })}
    </TextField>
  );
};