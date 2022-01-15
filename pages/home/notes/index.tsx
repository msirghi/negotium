import { NotesContainer } from '../../../src/components/notes';
import { StaticProps } from '../../../src/common/constants/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Notes = () => {
  return (
    <>
      <NotesContainer />
    </>
  );
};

export async function getStaticProps({ locale, params }: StaticProps) {
  return {
    props: {
      ...params,
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

export default Notes;
