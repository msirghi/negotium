import { InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../../../common/styles/colors';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
  input: {
    backgroundColor: colors.greys['800'],
    height: 30,
    borderRadius: 5,
    marginLeft: 20,
    transition: '.3s background-color ease-in-out',
    '&.Mui-focused': {
      backgroundColor: colors.white,
      border: 'none',
    },
  },
});

export const HeaderSearch = () => {
  const classes = useStyles();

  return (
    <TextField
      size={'small'}
      InputProps={{
        className: classes.input,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
