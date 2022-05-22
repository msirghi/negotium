import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from '../../../../../../../common/config/routes';
import { DefaultHomePage } from '../../../../../../../common/constants/enums';
import { setDefaultHomeView } from '../../../../../../../redux/account/accountSlice';
import { RootState } from '../../../../../../../redux/store';
import AccountService from '../../../../../../../services/AccountService';

export const useMetadataActions = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultView = useSelector((state: RootState) => state.account.metadata.defaultHomeView);
  const dispatch = useDispatch();

  const routeToHomePage = async (homepage: string, language: string) => {
    setLoading(true);
    if (homepage === DefaultHomePage.INBOX) {
      await router.push(Routes.inbox, Routes.inbox, { locale: language });
    }
    if (homepage === DefaultHomePage.TODAY) {
      await router.push(Routes.today, Routes.today, { locale: language });
    }
    if (homepage === DefaultHomePage.TIMELINE) {
      await router.push(Routes.timeline, Routes.timeline, { locale: language });
    }
    setLoading(false);
  };

  const updateDefaultHomeView = async (newView: string) => {
    setLoading(true);
    try {
      await AccountService.updateUserHomeView(newView.toLowerCase());
      dispatch(setDefaultHomeView(newView));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return { updateDefaultHomeView, loading, routeToHomePage, defaultView };
};
