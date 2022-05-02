import { TimelineView } from '../constants/enums';
import { TIMELINE_VIEW_KEY } from '../constants/constants';

const isWindowDefined = () => typeof window !== 'undefined';

const getFromLocalStorage = (key: string) => {
  if (StorageUtils.isWindowDefined()) {
    return localStorage.getItem(key);
  }
};

const setToLocalStorage = (key: string, value: string) => {
  if (StorageUtils.isWindowDefined()) {
    localStorage.setItem(key, value);
  }
};

const setTimelineView = (view: TimelineView) => {
  if (StorageUtils.isWindowDefined()) {
    localStorage.setItem(TIMELINE_VIEW_KEY, view);
  }
}

const getTimelineDefaultView = () => {
  if (!StorageUtils.isWindowDefined()) {
    return TimelineView.DEFAULT;
  }

  const fromStorage = localStorage.getItem(TIMELINE_VIEW_KEY);
  if (fromStorage === TimelineView.DEFAULT || fromStorage === TimelineView.LIST) {
    return fromStorage;
  }
  return TimelineView.DEFAULT;
}

const StorageUtils = {
  isWindowDefined,
  localStorage: {
    get: getFromLocalStorage,
    set: setToLocalStorage,
    setTimelineView,
    getTimelineDefaultView
  },
};

export default StorageUtils;
