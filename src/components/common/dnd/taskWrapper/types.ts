import {Task} from "../../../../common/types/tasks.types";

export type DndTaskWrapperProps = {
  handleDragEnd: (result: any) => void;
};

export type TaskOrderUpdateDto = {
  updatedOrderNumbers: Array<{
    id: Task['id'];
    orderNumber: number;
  }>;
};
