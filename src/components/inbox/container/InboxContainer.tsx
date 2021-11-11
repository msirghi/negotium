import { TaskWrapper } from '../../common/content/taskWrapper';
import { TaskWrapperTitleOptions } from '../../common/content/types';
import { useQuery } from 'react-query';
import { tasksRequests } from '../../../common/requests/tasksRequests';
import { TaskItem } from '../../common/content/taskWrapper/taskItem/TaskItem';
import { SectionWrapper } from '../../common/content/taskWrapper/section/wrapper/SectionWrapper';
import { useEffect, useState } from 'react';
import { ISection, ITask } from '../../../common/types/tasks.types';
import dayjs from 'dayjs';
import SortUtils from '../../../common/utils/sortUtils';
import {useFetchTasks} from "../../../common/hooks/tasks/useFetchTasks";
import {useFetchTasksBySection} from "../../../common/hooks/tasks/useFetchTasksBySection";

const editableOptions: TaskWrapperTitleOptions = {
  title: 'Inbox',
  onSave: (val) => console.log(val),
};

export const InboxContainer = () => {
  const { isLoading, data } = useFetchTasks();
  const { isLoading: sectionsLoading, data: sectionData } = useFetchTasksBySection();

  const [sections, setSections] = useState<ISection[]>([]);

  useEffect(() => {
    if (sectionData) {
      setSections(sectionData.data);
    }
  }, [sectionData]);

  const onSectionAdd = (title: string, orderNumber: number) => {
    const newSection: ISection = {
      id: 'new',
      sectionTasks: [],
      sectionTitle: title,
      orderNumber,
    };

    setSections([...sections, newSection]);
  };

  const onTaskAdd = (title: string, sectionId: string) => {
    const newTask: ITask = {
      title,
      orderNumber: 0,
      id: 'task',
      createdDate: dayjs().format(),
      completed: false,
    };

    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        section.sectionTasks.push(newTask);
      }
      return section;
    });
    setSections(updatedSections);
  };

  if (isLoading || !data || sectionsLoading || !sectionData) {
    return <div>Loading...</div>;
  }

  return (
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
          {SortUtils.sortSectionsByOrder(sections).map((section) => {
            return (
              <SectionWrapper
                key={section.id}
                sectionId={section.id}
                onTaskAdd={onTaskAdd}
                onSectionAdd={onSectionAdd}
                title={section.sectionTitle}
                tasks={section.sectionTasks}
              />
            );
          })}
        </div>
      </TaskWrapper>
    </div>
  );
};
