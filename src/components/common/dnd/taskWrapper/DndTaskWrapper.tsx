import React, { FC } from 'react';
import { Task } from '../../../../common/types/tasks.types';
import { TaskOrderUpdateDto } from './types';
import TaskService from '../../../../services/TaskService';

type Props = {
  tasks: Task[];
  updateTasks: (updatedTasks: Task[]) => void;
};

export const DndTaskWrapper: FC<Props> = ({ children, tasks, updateTasks }) => {
  const reorder = (list: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.filter(Boolean);
  };

  const updateOrder = (list: Task[]) => {
    const dto: TaskOrderUpdateDto = {
      updatedOrderNumbers: list.map(({ orderNumber, id }, idx) => ({
        orderNumber: idx,
        id,
      })),
    };
    TaskService.updateOrderNumbers(dto);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const updated = reorder(
      tasks.filter((task) => !task.completed && !task.projectId),
      result.source.index,
      result.destination.index
    );
    const filtered = updated.map((r, idx) => ({ ...r, orderNumber: idx }));
    updateTasks(filtered);
    updateOrder(filtered)
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;
    return React.cloneElement(child, { handleDragEnd });
  });

  return <>{childrenWithProps}</>;
};
