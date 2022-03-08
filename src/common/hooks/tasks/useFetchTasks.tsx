import { tasksRequests } from '../../requests/tasksRequests';
import { useEffect, useState } from 'react';
import { Task } from '../../types/tasks.types';

export function useFetchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const tasks = await tasksRequests.fetchTasks();
    setTasks(tasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { isLoading, data: tasks, refetch: fetchTasks };
}
