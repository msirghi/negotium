import { TodayContainer } from '../../../src/components/today';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';

const Today = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.today'))}</title>
      </Head>
      <TodayContainer />
    </>
  );
};

export async function getServerSideProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

export default Today;
