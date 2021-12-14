import { styled } from '@mui/styles';
import { Select, SelectProps } from '@mui/material';
import colors from '../../../../common/styles/colors';

export const NativeSelect = styled((props: SelectProps<string>) => (
  <Select {...props} native fullWidth variant="outlined" />
))({
  select: {
    '&.MuiOutlinedInput-input': {
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left',
      padding: '3px 26px 7px 10px',
      backgroundColor: colors.white,
      border: `1px solid ${colors.greys['400']}`,
      transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '&:focus': {
        borderColor: colors.primaries.lightBlue_1,
      },
      '&.Mui-disabled': {
        WebkitTextFillColor: colors.greys['800'],
        backgroundColor: colors.greys['100'],
      },
    },
  },
  '& .MuiSvgIcon-root': {
    color: colors.primaries.lightBlue_1,
  },
});
