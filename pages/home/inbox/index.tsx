import { InboxContainer } from '../../../src/components/inbox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';
import { useTranslation } from 'next-i18next';

const Inbox = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.inbox'))}</title>
      </Head>
      <InboxContainer />
    </div>
  );
};

export async function getServerSideProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

export default Inbox;
