import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProjectContainer } from '../../../src/components/project';
import Routes from '../../../src/common/config/routes';
import { Fade } from '@mui/material';

export default function Projects() {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    setProjectId('');
    if (router.query && router.query.id) {
      setProjectId(router.query.id as string);
      return;
    }
    router.push(Routes.inbox);
  }, [router.query]);

  if (!projectId) {
    return <div />;
  }

  return (
    <Fade in timeout={1000}>
      <div>
        <ProjectContainer projectId={projectId} />
      </div>
    </Fade>
  );
}
