import TestUtils from '../../tests/TestUtils';
import SlateUtils from '../slateUtils';
import dayjs from 'dayjs';

describe('SlateUtils', () => {
  describe('serialize', () => {
    it('should return serialized string', () => {
      const nodes = JSON.parse(TestUtils.testData.fakeTitle);
      const result = SlateUtils.serialize(nodes);
      expect(result).toContain('new task for 123');
    });
  });

  describe('transformKeywordToDate', () => {
    it('should return todays date if respective keyword is provided', () => {
      const expected = dayjs().format();
      const result = SlateUtils.transformKeywordToDate('today');
      expect(result).toEqual(expected);
    });

    it('should return tomorrow date if respective keyword is provided', () => {
      const expected = dayjs().add(1, 'day').format();
      const result = SlateUtils.transformKeywordToDate('tomorrow');
      expect(result).toEqual(expected);
    });

    it('should return undefined date if keyword has no matches', () => {
      const result = SlateUtils.transformKeywordToDate('keyword');
      expect(result).toBeUndefined();
    });
  });

  describe('detectDateInInput', () => {
    it('should return today keyword if string contains respective word', () => {
      const expected = dayjs().format();
      const result = SlateUtils.detectDateInInput('new task for today');
      expect(result).toEqual(expected);
    });

    it('should return tomorrows date if respective keyword is provided', () => {
      const expected = dayjs().add(1, 'day').format();
      const result = SlateUtils.detectDateInInput('tomorrow');
      expect(result).toEqual(expected);
    });

    it('should return undefined  if string does not contain respective word', () => {
      const result = SlateUtils.detectDateInInput('new task');
      expect(result).toBeUndefined();
    });
  });

  describe('detectDateKeywords', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fire callback if keyword was found', () => {
      const callback = jest.fn();
      SlateUtils.detectDateKeywords('today', callback);
      expect(callback).toBeCalled();
    });

    it('should not fire callback if keyword was not found', () => {
      const callback = jest.fn();
      SlateUtils.detectDateKeywords('test', callback);
      expect(callback).not.toBeCalled();
    });
  });

  describe('removeDateKeyword', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should remove mention type from children', () => {
      const parsedTitle = JSON.parse(TestUtils.testData.fakeTitle) as any;
      parsedTitle[0].children[1] = { type: 'mention' };

      const result = SlateUtils.removeDateKeyword(JSON.stringify(parsedTitle));
      expect(JSON.stringify(result)).not.toContain('mention');
    });

    it('should remove the initial value if there was an error during parsing', () => {
      const result = SlateUtils.removeDateKeyword(JSON.stringify(1));
      expect(JSON.stringify(result)).toContain('1');
    });
  });
});
