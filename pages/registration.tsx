import { RegistrationContainer } from '../src/components/registration';
import useTranslation from 'next-translate/useTranslation';
import StringUtils from '../src/common/utils/stringUtils';
import Head from 'next/head';
import { StaticProps } from '../src/common/constants/types';

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

// export async function getStaticProps({ locale }: StaticProps) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'auth'])),
//     },
//   };
// }

export default Registration;
