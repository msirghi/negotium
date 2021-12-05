import {makeStyles} from "@mui/styles";
import colors from "../../../../../common/styles/colors";

export const useAccountMenuStyles = makeStyles({
  accountContainer: {
    minWidth: 300,
    maxWidth: 450,
  },
  accountTitles: {
    marginLeft: 15,
    fontSize: 14,
  },
  email: {
    color: colors.greys['600'],
  },
  name: {
    fontWeight: 'bold',
  },
});
