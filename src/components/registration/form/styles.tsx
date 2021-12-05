import {makeStyles} from "@mui/styles";
import colors from "../../../common/styles/colors";

export const useRegistrationFormStyles = makeStyles({
  buttonContainer: {
    marginTop: 30,
  },
  error: {
    marginTop: 15,
    color: colors.error.main,
    textAlign: 'center',
  },
});
