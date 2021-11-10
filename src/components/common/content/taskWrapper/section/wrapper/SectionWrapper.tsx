import { FC } from 'react';
import { ITask } from '../../../../../../common/types/tasks.types';
import styles from './SectionWrapper.module.scss';
import { TaskItem } from '../../taskItem/TaskItem';
import { AddSectionRow } from '../add/AddSectionRow';
import { Divider } from '@mui/material';
import { TaskAddButton } from '../taskAdd/TaskAddButton';

type Props = {
  title: string;
  tasks: ITask[];
};

export const SectionWrapper: FC<Props> = ({ title, tasks }) => {
  return (
    <>
      <div className={styles.swContainer}>
        <AddSectionRow onClick={() => {}} />
        <div className={styles.swTitle}>{title}</div>
        <Divider />
        <div className={styles.swTaskContainer}>
          {tasks.map((task) => {
            return <TaskItem task={task} key={task.id} />;
          })}
          <TaskAddButton />
        </div>
      </div>
    </>
  );
};
