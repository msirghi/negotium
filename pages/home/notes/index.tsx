import { NotesContainer } from '../../../src/components/notes';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';
import useTranslation from 'next-translate/useTranslation';

export default function Notes() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{StringUtils.getPageTitle(t('pageTitles.notes'))}</title>
      </Head>
      <NotesContainer />
    </>
  );
};
