import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';

const Project = () => {
  return <ProjectContainer />;
};

export const getServerSideProps = async ({ locale }: StaticProps) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
};

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

export default Project;
