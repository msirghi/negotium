import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import {useTranslation} from "next-i18next";

const Project = () => {
  const t = useTranslation();
  console.log('t: ', t);

  return <ProjectContainer />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      // ...(await serverSideTranslations(locale || 'en', ['common', 'settings'])),
    },
  };
}

export default Project;
