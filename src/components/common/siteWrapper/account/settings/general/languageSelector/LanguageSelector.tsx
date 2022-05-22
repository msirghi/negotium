import { TextInputChangeEvent } from '../../../../../../../common/constants/types';
import { setLanguage } from '../../../../../../../redux/account/accountSlice';
import AccountService from '../../../../../../../services/AccountService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MenuItem, TextField } from '@mui/material';
import { SUPPORTED_LANGUAGES } from '../../../../../../../common/constants/constants';
import { RootState } from '../../../../../../../redux/store';
import { useIsMobile } from '../../../../../../../common/hooks/common/useIsMobile';

type Props = {
  className: string;
};

export const LanguageSelector = ({ className }: Props) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const router = useRouter();
  const userMetadata = useSelector((state: RootState) => state.account.metadata);

  const updateLanguage = async (evt: TextInputChangeEvent) => {
    const language = evt.target.value;
    dispatch(setLanguage(language));
    await AccountService.updateUserLanguage(language);
    await router.push(router.route, router.route, { locale: language });
  };

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
