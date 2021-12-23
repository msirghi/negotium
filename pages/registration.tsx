import { RegistrationContainer } from '../src/components/registration';
import { useTranslation } from 'next-i18next';
import StringUtils from '../src/common/utils/stringUtils';
import Head from 'next/head';
import { StaticProps } from '../src/common/constants/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Registration = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.registration'))}</title>
      </Head>
      <RegistrationContainer />
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

export default Registration;
