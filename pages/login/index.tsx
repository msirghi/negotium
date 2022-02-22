import { AuthContainer } from '../../src/components/login';
import Head from 'next/head';
import StringUtils from '../../src/common/utils/stringUtils';
import useTranslation from 'next-translate/useTranslation';
import { StaticProps } from '../../src/common/constants/types';

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

// export async function getStaticProps({ locale }: StaticProps) {
//   return {
//     // props: {
//     //   ...(await serverSideTranslations(locale, ['common', 'auth'])),
//     // },
//   };
// }

export default Login;
