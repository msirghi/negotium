import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
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
import { CacheProvider } from '@emotion/react';
import { StylesProvider, createGenerateClassName } from '@mui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

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

export default MyApp;
