import reducer, { setAccountInfo } from './accountSlice';
import { tempAccountInfo } from '../../common/constants/constants';

describe('Account slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'type' })).toEqual({
      info: tempAccountInfo,
    });
  });

  it('should handle account info set', () => {
    expect(
      reducer(
        {
          info: {
            id: '123',
            name: 'Name',
            email: 'mail',
          },
        },
        setAccountInfo(tempAccountInfo)
      )
    ).toEqual({
      info: tempAccountInfo,
    });
  });
});
