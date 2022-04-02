// @ts-nocheck
import { createTheme } from '@mui/material/styles';
import colors from '../styles/colors';

const defaultFontFamily = `"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif`;

export const defaultLightTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: defaultFontFamily,
    },
  },
  palette: {
    primary: {
      main: colors.primaries.lightBlue,
      light: colors.primaries.lightBlue_1,
      dark: colors.primaries.lightBlue,
    },
    custom: {
      menuIconBackground: colors.primaries.lightBlue,
      headerSearchBackground: colors.blues.light,
    },
  },
});

export const noirAppTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: defaultFontFamily,
    },
  },
  palette: {
    primary: {
      main: colors.greys['900'],
      light: colors.greys['800'],
      dark: colors.primaries.teal,
    },
    custom: {
      menuIconBackground: colors.greys['800'],
      headerSearchBackground: colors.greys['800'],
    }
  },
});

export const themeMap: { [key: string]: any } = {
  default: defaultLightTheme,
  noir: noirAppTheme,
};
