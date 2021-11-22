import { UpcomingContainer } from '../../../src/components/upcoming';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';

const Upcoming = () => {
  return <UpcomingContainer />;
};

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Upcoming;
