import { AuthContainer } from '../../src/components/login';
import Head from 'next/head';
import StringUtils from '../../src/common/utils/stringUtils';
import useTranslation from 'next-translate/useTranslation';

const Login = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.login'))}</title>
      </Head>
      <AuthContainer />
    </>
  );
};

export default Login;
