import { MenuItem, TextField } from '@mui/material';
import { HOME_VIEW_LIST } from '../../../../../../../common/constants/constants';
import { TextInputChangeEvent } from '../../../../../../../common/constants/types';
import { useMetadataActions } from '../hooks/useMetadataActions';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';

type Props = {
  className: string;
};

export const HomeViewSelector = ({ className }: Props) => {
  const { loading: homeViewLoading, updateDefaultHomeView, defaultView } = useMetadataActions();
  const isMobile = useIsMobile();

  const updateHomeView = ({ target }: TextInputChangeEvent) => {
    updateDefaultHomeView(target.value);
  };

  return (
    <TextField
      select
      value={defaultView}
      disabled={homeViewLoading}
      onChange={updateHomeView}
      size={'small'}
      className={className}
      fullWidth={isMobile}
    >
      {HOME_VIEW_LIST.map(({ title, key }) => {
        return (
          <MenuItem key={title} value={key}>
            {title}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
