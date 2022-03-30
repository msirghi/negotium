import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';
import useTranslation from 'next-translate/useTranslation';
import TimelineContainer from '../../../src/components/timeline';

export default function Notes() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.timeline'))}</title>
      </Head>
      <TimelineContainer />
    </>
  );
}
