import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';
import { GetStaticPaths } from 'next';

const Project = () => {
  return <ProjectContainer />;
};

export async function getStaticProps({ locale }: StaticProps) {
  return {
    paths: [],
    fallback: 'blocking',
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

//
// export const getStaticProps: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };

export default Project;
