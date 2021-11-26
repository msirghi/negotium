import { InboxContainer } from '../../../src/components/inbox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';

const Inbox = () => {
  return (
    <div>
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

export default Inbox;
