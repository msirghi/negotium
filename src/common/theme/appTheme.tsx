import { createTheme } from '@mui/material/styles';
import colors from '../styles/colors';

export const appTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Raleway", "Roboto", "Helvetica", "Arial", sans-serif`,
    },
  },
  palette: {
    primary: {
      main: colors.primaries.lightBlue_1,
      light: colors.primaries.lightBlue_1,
      dark: colors.primaries.lightBlue_1,
    },
  },
});
