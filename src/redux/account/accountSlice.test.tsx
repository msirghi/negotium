import reducer, {
  setAccountInfo,
  setMetadata,
  setSiteTheme,
} from './accountSlice';
import { tempAccountInfo } from '../../common/constants/constants';

describe('Account slice', () => {
  const testState = {
    info: {
      id: '123',
      name: 'Name',
      email: 'mail',
    },
    metadata: { theme: 'Noir' },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'type' })).toEqual({
      info: {
        email: '',
        name: '',
        id: '',
      },
      metadata: {
        theme: '',
      },
    });
  });

  it('should handle account info set', () => {
    expect(reducer(testState, setAccountInfo(tempAccountInfo))).toEqual({
      info: tempAccountInfo,
      metadata: { theme: 'Noir' },
    });
  });

  it('should set the site theme', () => {
    expect(reducer(testState, setSiteTheme('theme')).metadata.theme).toEqual(
      'theme'
    );
  });

  it('should set the metadata', () => {
    expect(
      reducer(
        testState,
        setMetadata({
          theme: 'theme',
        })
      ).metadata
    ).toEqual({ theme: 'theme' });
  });
});
