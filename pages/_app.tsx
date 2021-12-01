import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SiteWrapper } from '../src/components/common/siteWrapper';
import { useRouter } from 'next/router';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../src/common/theme/appTheme';
import createEmotionCache from '../src/common/config/cache/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { appWithTranslation } from 'next-i18next';
import AuthService from '../src/services/AuthService';
import { LoginResponse } from '../src/common/constants/types';
import { FullscreenLoader } from '../src/components/common/spinners/fullscreen/FullscreenLoader';
import authorizationStore from '../src/common/requests/authorizationStore';

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

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const res = (await AuthService.getRefreshedToken()) as {
        data: LoginResponse;
      };
      authorizationStore.setAuthToken(res.data.access_token);
      if (router.route === '/login' || router.route === '/register') {
        await router.push('/home/inbox');
      }
    } catch (e) {
      await router.push('/login');
    }
    setLoading(false);
  };

  if (loading) {
    return <FullscreenLoader />;
  }

  if (router.route.includes('/auth')) {
    return <Component {...pageProps} />;
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <ThemeProvider theme={appTheme}>
                  <SiteWrapper>
                    <Component {...pageProps} />
                  </SiteWrapper>
                </ThemeProvider>
              </LocalizationProvider>
            </SnackbarProvider>
          </QueryClientProvider>
        </Provider>
      </CacheProvider>
    </StylesProvider>
  );
}

export default appWithTranslation(MyApp);
