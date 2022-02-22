import { TodayContainer } from '../../../src/components/today';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';

const Today = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.today'))}</title>
      </Head>
      <TodayContainer />
    </>
  );
};

export default Today;
