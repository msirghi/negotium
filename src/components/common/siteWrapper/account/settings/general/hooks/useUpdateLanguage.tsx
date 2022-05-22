import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../../../../redux/store';
import { TextInputChangeEvent } from '../../../../../../../common/constants/types';
import { setLanguage } from '../../../../../../../redux/account/accountSlice';
import AccountService from '../../../../../../../services/AccountService';

export const useUpdateLanguage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userMetadata = useSelector((state: RootState) => state.account.metadata);

  const updateLanguage = async (evt: TextInputChangeEvent) => {
    const language = evt.target.value;
    dispatch(setLanguage(language));
    await AccountService.updateUserLanguage(language);
    await router.push(router.route, router.route, { locale: language });
  };

  return { updateLanguage, userMetadata };
};
