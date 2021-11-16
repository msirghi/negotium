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
import { ThemeProvider } from '@mui/styles';
import { appTheme } from '../src/common/theme/appTheme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <SiteWrapper>
                <Head>
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                  />
                </Head>
                <Component {...pageProps} />
              </SiteWrapper>
            </LocalizationProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
