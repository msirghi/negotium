import { AuthContainer } from '../../src/components/login';
import Head from 'next/head';
import StringUtils from '../../src/common/utils/stringUtils';
import { useTranslation } from 'next-i18next';
import { StaticProps } from '../../src/common/constants/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.login'))}</title>
      </Head>
      <AuthContainer />
    </>
  );
};

export async function getServerSideProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
    },
  };
}

export default Login;
