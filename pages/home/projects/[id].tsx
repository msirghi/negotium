import { ProjectContainer } from '../../../src/components/project';

export default function Project() {
  return <ProjectContainer />;
}

export async function getStaticProps() {
  return { props: {} };
}
