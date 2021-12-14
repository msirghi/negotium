import { siteThemes } from '../constants/constants';

const isValidTheme = (theme: string) => {
  return !!siteThemes.find(({ internalKey }) => internalKey === theme);
};

const ThemeUtils = {
  isValidTheme,
};

export default ThemeUtils;
