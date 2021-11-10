import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskWrapperTitleOptions } from '../../common/content/types';
import { useQuery } from 'react-query';
import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { SectionWrapper } from '../../common/content/taskWrapper/section/wrapper/SectionWrapper';
import { AddSectionRow } from '../../common/content/taskWrapper/section/add/AddSectionRow';

const editableOptions: TaskWrapperTitleOptions = {
  title: 'Inbox',
  onSave: (val) => console.log(val),
};

export const InboxContainer = () => {
  const { isLoading, data } = useQuery('inboxQuery', tasksRequests.fetchTasks);
  const { isLoading: sectionsLoading, data: sectionData } = useQuery(
    'sectionsQuery',
    tasksRequests.fetchTasksGroupedBySection
  );

  if (isLoading || !data || sectionsLoading || !sectionData) {
    return <div>Loading...</div>;
  }

  console.log(sectionData);

  return (
    // <div style={{ padding: '0 2rem' }}>
    <div>
      <TaskWrapper
        title={'Inbox'}
        upperHeaderTitle={'Inbox'}
        editableOptions={editableOptions}
      >
        {data.tasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })}

        <div>
          {sectionData.data.map((section) => {
            return (
              <SectionWrapper
                title={section.sectionTitle}
                tasks={section.sectionTasks}
                key={section.id}
              />
            );
          })}
        </div>
      </TaskWrapper>
    </div>
  );
};
