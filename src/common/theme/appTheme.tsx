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
      mainBackgroundColor: colors.primaries.lightBlue,
      activeMainBackgroundColor: colors.primaries.darkBlue,
      progressBarColor: colors.primaries.lightBlue_1
    },
  },
});

export const lightGreyTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: defaultFontFamily,
    },
  },
  palette: {
    primary: {
      main: colors.primaries.lightGrey,
      light: colors.greys['500'],
      dark: colors.greys['600'],
      contrastText: colors.black,
    },
    custom: {
      menuIconBackground: colors.greys['600'],
      headerSearchBackground: colors.greys['100'],
      tabsColor: colors.black,
      textColor: colors.black,
      iconColor: colors.black,
      mainBackgroundColor: colors.greys['600'],
      activeMainBackgroundColor: colors.greys['800'],
      progressBarColor: colors.primaries.lightBlue
    },
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        colorPrimary: { color: 'red' }
      }
    }
  }
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
      mainBackgroundColor: colors.greys['800'],
      activeMainBackgroundColor: colors.greys['900'],
      progressBarColor: colors.primaries.lightBlue
    },
  },
});

export const themeMap: { [key: string]: any } = {
  default: defaultLightTheme,
  noir: noirAppTheme,
  lightGrey: lightGreyTheme,
};
