import { TasksMock } from '../../tests/mockData/tasks-mock';
import CalendarUtils from '../calendarUtils';
import { noirAppTheme } from '../../theme/appTheme';

describe('Calendar Utils', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('convertTasksToEvents', () => {
    it('should transform tasks to calendar events', () => {
      const tasks = [...TasksMock];
      const result = CalendarUtils.convertTasksToEvents(tasks);
      expect(result).toHaveLength(tasks.length);
      expect(result[0].id).toBe(TasksMock[0].id);
    });
  });

  describe('updateCalendarStyles', () => {
    it('should get the elements by specific selector', () => {
      jest.spyOn(document, 'querySelectorAll').mockReturnValue([{ style: {} }] as any);
      CalendarUtils.updateCalendarStyles(noirAppTheme);
      expect(document.querySelectorAll).toBeCalled();
    });
  });
});
