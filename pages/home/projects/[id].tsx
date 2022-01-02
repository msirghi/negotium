import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {GetServerSidePropsContext, GetStaticPaths} from 'next';
import { withTranslation } from 'next-i18next';

const Project = () => {
  return <ProjectContainer />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'settings'])),
    },
  };
}
export default Project;
