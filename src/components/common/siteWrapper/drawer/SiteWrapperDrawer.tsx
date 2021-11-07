import { SiteWrapperMainList } from '../lists/main/SiteWrapperMainList';
import { SiteWrapperProjectsList } from '../lists/projects/SiteWrapperProjectsList';

export const SiteWrapperDrawer = () => {
  return (
    <div>
      <SiteWrapperMainList />
      <SiteWrapperProjectsList />
    </div>
  );
};
