import { InboxContainer } from '../../../src/components/inbox';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';
import useTranslation from 'next-translate/useTranslation';

const Inbox = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.inbox'))}</title>
      </Head>
      <InboxContainer />
    </div>
  );
};

export default Inbox;
