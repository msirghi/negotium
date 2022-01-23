import { FC } from 'react';
import { Section, Task } from '../../../../../../common/types/tasks.types';
import styles from './SectionWrapper.module.scss';
import { TaskItem } from '../../taskItem/TaskItem';
import { Divider } from '@mui/material';
import { TaskAddButton } from '../taskAdd/TaskAddButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Nullable } from '../../../../../../common/types/common.types';
import { EditableTitle } from '../../../pageTitle/editableTitle/EditableTitle';
import SmoothList from 'react-smooth-list';

type Props = {
  sectionId: string;
  title: string;
  tasks: Task[];
  onTaskAdd: (title: string, date: Nullable<Date>, sectionId: string) => void;
  markAsDone: (id: string) => void;
  onTaskSelect: (task: Task) => void;
  onSectionUpdate: (
    title: Section['title'],
    sectionId: Props['sectionId']
  ) => void;
  onSectionRemove: (sectionId: Section['id']) => void;
};

export const SectionWrapper: FC<Props> = ({
  title,
  tasks,
  onTaskAdd,
  sectionId,
  markAsDone,
  onTaskSelect,
  onSectionUpdate,
  onSectionRemove,
}) => {
  const handleTaskAdd = () => {
    return (title: string, date: Nullable<Date>) =>
      onTaskAdd(title, date, sectionId);
  };

  const handleSectionUpdate = () => {
    return (newTitle: string) => onSectionUpdate(newTitle, sectionId);
  };

  const handleSectionRemove = () => {
    return onSectionRemove(sectionId);
  };

  return (
    <div className={styles.swContainer}>
      <EditableTitle
        title={title}
        className={styles.swTitle}
        editableOptions={{
          onSave: handleSectionUpdate(),
          title,
          inputFontSize: 16,
          onRemove: handleSectionRemove,
        }}
      >
        {title}
      </EditableTitle>
      <Divider />
      <div className={styles.swTaskContainer}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId={`section-tasks=${sectionId}`}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <SmoothList>
                  {tasks.map((task, idx) => {
                    return (
                      <TaskItem
                        task={task}
                        key={task.id}
                        onTaskSelect={onTaskSelect}
                        markAsDone={markAsDone}
                        index={idx}
                      />
                    );
                  })}
                </SmoothList>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <TaskAddButton onTaskAdd={handleTaskAdd()} />
      </div>
    </div>
  );
};
