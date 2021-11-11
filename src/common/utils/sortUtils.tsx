import { ISection } from '../types/tasks.types';

const sortSectionsByOrder = (sections: ISection[]) => {
  return sections.sort((s1, s2) => s1.orderNumber! - s2.orderNumber!);
};

const SortUtils = {
  sortSectionsByOrder,
};

export default SortUtils;
