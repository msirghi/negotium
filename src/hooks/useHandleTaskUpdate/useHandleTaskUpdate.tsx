import { useRef, useState } from 'react';
import { Task } from '../../common/types/tasks.types';
import { useAtom } from 'jotai';
import { showCompletedAtom } from '../../atoms/showCompleted/showCompleted.atom';
import ProjectService from '../../services/ProjectService';
import {Nullable} from "../../common/types/common.types";
import TaskUtils from "../../components/common/utilities/taskUtils/TaskUtils";
import {useFetchProjectTasks} from "../../common/hooks/tasks/useFetchProjectTasks";

export const useHandleTaskUpdate = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const projectId = useRef<string>('');
  const [showCompleted] = useAtom(showCompletedAtom);
  const { data: taskData, isLoading: loadingTasks, refetch } = useFetchProjectTasks(projectId.current);

  const markTaskAsDone = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)!;
    setTasks((prevState) => prevState.filter((t) => (showCompleted ? true : t.id !== taskId)));
    task.completed = !task.completed;
    await ProjectService.updateProjectTask(projectId.current, task);
  };

  const addTask = async (title: string, date: Nullable<Date>, sectionId?: string) => {
    const newTask: Omit<Task, 'id'> = TaskUtils.getNewTaskObject(title, date, tasks.length - 1, projectId.current);
    if (sectionId) {
      newTask.sectionId = sectionId;
    }
    setTasks((prevState) => [...(prevState || []), newTask as Task]);
    await ProjectService.addProjectTask(projectId.current, newTask);
    refetch();
  }

  const updateTask = async (updatedTask: Task) => {
    const { id } = updatedTask;
    const updatedTasks = tasks.map((task) => (task?.id === id ? updatedTask : task));
    ProjectService.updateProjectTask(id, updatedTask);
    setTasks([...updatedTasks]);
  }

  const setProjectId = (id: string) => {
    projectId.current = id;
  };

  return { tasks, setTasks, setProjectId, markTaskAsDone, addTask, updateTask };
};
