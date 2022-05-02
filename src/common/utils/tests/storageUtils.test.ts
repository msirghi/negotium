import StorageUtils from '../storageUtils';
import { TimelineView } from '../../constants/enums';
import { TIMELINE_VIEW_KEY } from '../../constants/constants';

describe('Storage Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('get', () => {
    it('should not return anything if window is not defined', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(false);
      expect(StorageUtils.localStorage.get('key')).toBeUndefined();
    });

    it('should return value if window is defined', () => {
      localStorage.setItem('key', 'value');
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(true);
      expect(StorageUtils.localStorage.get('key')).toBeDefined();
      localStorage.removeItem('key');
    });
  });

  describe('set', () => {
    it('should not set anything if window is not defined', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(false);
      StorageUtils.localStorage.set('key', 'val');
      expect(localStorage.getItem('key')).toBeNull();
    });

    it('should set the value if window is defined', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(true);
      StorageUtils.localStorage.set('key', 'val');
      expect(localStorage.getItem('key')).toBeDefined();
      localStorage.removeItem('key');
    });
  });

  describe('setTimelineView', () => {
    it('should not set anything if window is not defined', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(false);
      StorageUtils.localStorage.setTimelineView(TimelineView.DEFAULT);
      expect(localStorage.getItem(TIMELINE_VIEW_KEY)).toBeNull();
    });

    it('should set the value if window is defined', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(true);
      StorageUtils.localStorage.setTimelineView(TimelineView.DEFAULT);
      expect(localStorage.getItem(TIMELINE_VIEW_KEY)).toBeDefined();
      localStorage.removeItem(TIMELINE_VIEW_KEY);
    });
  });

  describe('getTimelineDefaultView', () => {
    it('should return DEFAULT value if window is not defined', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(false);
      expect(StorageUtils.localStorage.getTimelineDefaultView()).toBe(TimelineView.DEFAULT);
    });

    it('should return DEFAULT value if invalid value was returned', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(true);
      localStorage.setItem(TIMELINE_VIEW_KEY, 'key');
      expect(StorageUtils.localStorage.getTimelineDefaultView()).toBe(TimelineView.DEFAULT);
      localStorage.removeItem(TIMELINE_VIEW_KEY);
    });

    it('should return DEFAULT value if it is returned from local storage', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(true);
      localStorage.setItem(TIMELINE_VIEW_KEY, TimelineView.DEFAULT);
      expect(StorageUtils.localStorage.getTimelineDefaultView()).toBe(TimelineView.DEFAULT);
    });

    it('should return LIST value if it is returned from local storage', () => {
      jest.spyOn(StorageUtils, 'isWindowDefined').mockReturnValue(true);
      localStorage.setItem(TIMELINE_VIEW_KEY, TimelineView.LIST);
      expect(StorageUtils.localStorage.getTimelineDefaultView()).toBe(TimelineView.LIST);
    });
  });
});
