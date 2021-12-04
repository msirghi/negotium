import StringUtils from '../stringUtils';

describe('String Utils', () => {
  describe('getTaskInputDateByKeywords', () => {
    it('should return null date if no keyword was found', () => {
      expect(StringUtils.getTaskInputDateByKeywords('String').date).toBeNull();
    });

    it('should return not-null date if today keyword was found', () => {
      expect(
        StringUtils.getTaskInputDateByKeywords('String !today').date
      ).not.toBeNull();
    });

    it('should return not-null date if tomorrow keyword was found', () => {
      expect(
        StringUtils.getTaskInputDateByKeywords('String !tomorrow').date
      ).not.toBeNull();
    });

    it('should return string without the keyword', () => {
      expect(
        StringUtils.getTaskInputDateByKeywords('String !today').value
      ).toEqual('String');
    });
  });
});
