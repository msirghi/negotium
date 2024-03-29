import { NotesContainer } from '../../../src/components/notes';
import { StaticProps } from '../../../src/common/constants/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import StringUtils from '../../../src/common/utils/stringUtils';
import { useTranslation } from 'next-i18next';

const Notes = () => {
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

export async function getStaticProps({ locale, params }: StaticProps) {
  return {
    props: {
      ...params,
      ...(await serverSideTranslations(locale, [
        'common',
        'notes',
        'settings',
      ])),
    },
  };
}

export default Notes;
