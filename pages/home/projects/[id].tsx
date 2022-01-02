import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';
import { GetStaticPaths } from 'next';

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
//     paths: [], //indicates that no page needs be created at build time
//     fallback: 'blocking', //indicates the type of fallback
//   };
// };

// export const getStaticProps: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'settings'])),
//     },
//   };
// };

export default Project;
