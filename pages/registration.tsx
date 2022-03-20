import { RegistrationContainer } from '../src/components/registration';
import useTranslation from 'next-translate/useTranslation';
import StringUtils from '../src/common/utils/stringUtils';
import Head from 'next/head';

const Registration = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.registration'))}</title>
      </Head>
      <RegistrationContainer />
    </>
  );
};

export default Registration;
