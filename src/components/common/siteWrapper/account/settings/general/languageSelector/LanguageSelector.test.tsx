import * as useUpdateLanguageHook from '../hooks/useUpdateLanguage';
import { shallow } from 'enzyme';
import { LanguageSelector } from './LanguageSelector';
import { TextField } from '@mui/material';

describe('LanguageSelector', () => {
  const defaultProps = {
    className: 'class',
  };
  const updateLanguageSpy = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(useUpdateLanguageHook, 'useUpdateLanguage').mockReturnValue({
      updateLanguage: updateLanguageSpy,
      userMetadata: { defaultHomeView: '', language: '', theme: 'theme' },
    });
  });

  it('should render select TextField', () => {
    const wrapper = shallow(<LanguageSelector {...defaultProps} />);
    expect(wrapper.find(TextField).props().select).toBeTruthy();
  });

  it('should handle language change event', () => {
    const wrapper = shallow(<LanguageSelector {...defaultProps} />);
    const input = wrapper.find(TextField) as any;
    input.props().onChange({ target: { value: 'val' } });
    expect(updateLanguageSpy).toBeCalled();
  });
});
