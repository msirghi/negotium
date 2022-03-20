import type { NextPage } from 'next';
import LandingPage from '../src/components/landing';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import StringUtils from '../src/common/utils/stringUtils';

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.landing'))}</title>
      </Head>
      <LandingPage />
    </>
  );
};

export default Home;
