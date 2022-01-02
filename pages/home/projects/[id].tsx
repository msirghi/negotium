import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticProps } from '../../../src/common/constants/types';
import {GetServerSidePropsContext, GetStaticPaths} from 'next';
import i18config from '../../../next-i18next.config';

const Project = () => {
  return <ProjectContainer />;
};

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'settings'], i18config)),
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
