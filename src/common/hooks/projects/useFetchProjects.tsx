import { useEffect, useState } from 'react';
import { Project } from '../../types/projects.types';
import ProjectService from '../../../services/ProjectService';
import { useDispatch } from 'react-redux';
import { setProjectsList } from '../../../redux/projects/projectsSlice';

export function useFetchProjects() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    const projects = await ProjectService.getProjects();
    dispatch(setProjectsList(projects as Project[]));
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { fetchProjects, loading: isLoading };
}
