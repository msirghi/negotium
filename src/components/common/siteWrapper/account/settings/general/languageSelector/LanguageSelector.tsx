import { MenuItem, TextField } from '@mui/material';
import { SUPPORTED_LANGUAGES } from '../../../../../../../common/constants/constants';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';
import { useUpdateLanguage } from '../hooks/useUpdateLanguage';

type Props = {
  className: string;
};

export const LanguageSelector = ({ className }: Props) => {
  const isMobile = useIsMobile();
  const { updateLanguage, userMetadata } = useUpdateLanguage();

  return (
    <TextField select value={userMetadata.language} size={'small'} className={className} fullWidth={isMobile} onChange={updateLanguage}>
      {SUPPORTED_LANGUAGES.map(({ code, title }) => {
        return (
          <MenuItem key={code} value={code}>
            {title}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
