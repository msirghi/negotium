import { InboxContainer } from '../../../src/components/inbox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';
import { useTranslation } from 'next-i18next';
import { GetStaticPaths } from 'next';

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

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export default Inbox;
