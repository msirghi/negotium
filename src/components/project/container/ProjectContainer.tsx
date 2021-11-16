import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { IProject } from '../../../common/types/projects.types';
import { Row } from '../../common/utilities/row/Row';
import { TaskWrapper } from '../../common/content/taskWrapper';
import { ContentBox } from '../../common/boxes/content/ContentBox';

export const ProjectContainer = () => {
  const router = useRouter();
  const [selectedProject, setSelectedProjects] = useState<IProject>();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    if (projects) {
      setSelectedProjects(projects.find((p) => p.id === router.query.id));
    }
  }, [projects, router.query.id]);

  if (!selectedProject) {
    return <div />;
  }

  return (
    <div>
      <Row fullWidth>
        <ContentBox>
          <TaskWrapper title={selectedProject.name}></TaskWrapper>
        </ContentBox>
      </Row>
    </div>
  );
};
