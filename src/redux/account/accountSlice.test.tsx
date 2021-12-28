import reducer, {
  setAccountInfo,
  setMetadata,
  setSiteTheme,
  setUserName,
  setLanguage,
  setUserEmail,
} from './accountSlice';
import { tempAccountInfo } from '../../common/constants/constants';

describe('Account slice', () => {
  const testState = {
    info: {
      id: '123',
      name: 'Name',
      email: 'mail',
    },
    metadata: { theme: 'Noir', language: 'ru' },
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
        language: '',
      },
    });
  });

  it('should handle account info set', () => {
    expect(reducer(testState, setAccountInfo(tempAccountInfo))).toEqual({
      info: tempAccountInfo,
      metadata: { theme: 'Noir', language: 'ru' },
    });
  });

  it('should set the site theme', () => {
    expect(reducer(testState, setSiteTheme('theme')).metadata.theme).toEqual(
      'theme'
    );
  });

  it('should set the user name', () => {
    expect(reducer(testState, setUserName('John')).info.name).toEqual('John');
  });

  it('should set the metadata', () => {
    expect(
      reducer(
        testState,
        setMetadata({
          theme: 'theme',
          language: '',
        })
      ).metadata
    ).toEqual({ theme: 'theme', language: '' });
  });

  it('should set user language', () => {
    expect(reducer(testState, setLanguage('ru')).metadata.language).toEqual(
      'ru'
    );
  });

  it('should set user email', () => {
    expect(reducer(testState, setUserEmail('email')).info.email).toEqual(
      'email'
    );
  });
});
