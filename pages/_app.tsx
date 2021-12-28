import axios from 'axios';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { appWithTranslation } from 'next-i18next';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StylesProvider, createGenerateClassName } from '@mui/styles';

import { store } from '../src/redux/store';
import Routes from '../src/common/config/routes';
import AuthService from '../src/services/AuthService';
import { SiteWrapper } from '../src/components/common/siteWrapper';
import { AxiosRequestInstance } from '../src/common/constants/types';
import authorizationStore from '../src/common/requests/authorizationStore';
import createEmotionCache from '../src/common/config/cache/createEmotionCache';
import { FullscreenLoader } from '../src/components/common/spinners/fullscreen/FullscreenLoader';
import {REFRESH_TOKEN_URL} from "../src/common/constants/constants";

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const refreshAuthLogic = async <T extends AxiosRequestInstance>(
    failedRequest: T
  ) => {
    try {
      if (failedRequest.response.config.url.includes(REFRESH_TOKEN_URL)) {
        return Promise.reject();
      }
      const response = await AuthService.getRefreshedToken();
      const token = response.data.access_token;
      authorizationStore.setAuthToken(token);
      localStorage.setItem('rt', token);
      failedRequest.response.config.headers[
        'Authorization'
      ] = `Bearer ${token}`;
      return Promise.resolve();
    } catch (e) {
      await router.push(Routes.login);
    }
  };

  const setupAxiosInterceptor = () =>
    createAuthRefreshInterceptor(axios, refreshAuthLogic);

  useEffect(() => {
    setupAxiosInterceptor();
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    refreshToken();
  }, []);

  const refreshToken = async () => {
    if (router.route === Routes.login) {
      setLoading(false);
      return;
    }
    try {
      const res = await AuthService.getRefreshedToken();
      authorizationStore.setAuthToken(res.data.access_token);
      if (
        router.route === Routes.login ||
        router.route === Routes.registration
      ) {
        await router.push(Routes.inbox);
      }
    } catch (e) {
      await router.push(Routes.login);
    }
    setLoading(false);
  };

  if (loading) {
    return <FullscreenLoader />;
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <SiteWrapper>
                  <Component {...pageProps} />
                </SiteWrapper>
              </LocalizationProvider>
            </SnackbarProvider>
          </QueryClientProvider>
        </Provider>
      </CacheProvider>
    </StylesProvider>
  );
}

export default appWithTranslation(MyApp);
