import { ProjectContainer } from '../../../src/components/project';
import { GetStaticPaths } from 'next';

export default function Project() {
  return <ProjectContainer />;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
