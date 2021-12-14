import { FC } from 'react';
import { ITask } from '../../../../../../common/types/tasks.types';
import styles from './SectionWrapper.module.scss';
import { TaskItem } from '../../taskItem/TaskItem';
import { AddSectionRow } from '../add/AddSectionRow';
import { Divider } from '@mui/material';
import { TaskAddButton } from '../taskAdd/TaskAddButton';

type Props = {
  sectionId: string;
  title: string;
  tasks: ITask[];
  onSectionAdd: (title: string, orderNumber: number) => void;
  onTaskAdd: (title: string, sectionId: string) => void;
};

export const SectionWrapper: FC<Props> = ({
  title,
  tasks,
  onSectionAdd,
  onTaskAdd,
  sectionId,
}) => {
  return (
    <div className={styles.swContainer}>
      <AddSectionRow onSectionSave={onSectionAdd} />
      <div className={styles.swTitle}>{title}</div>
      <Divider />
      <div className={styles.swTaskContainer}>
        {tasks.map((task) => {
          return <TaskItem task={task} key={task.id} onTaskSelect={() => {}} markAsDone={() => {}} />;
        })}
        <TaskAddButton onTaskAdd={(title) => onTaskAdd(title, sectionId)} />
      </div>
    </div>
  );
};
