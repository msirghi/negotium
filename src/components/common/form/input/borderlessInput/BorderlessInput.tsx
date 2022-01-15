import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

export const BorderlessInput: FC<TextFieldProps> = (props) => {
  const inputProps = props.InputProps ? { ...props.InputProps } : {};
  return (
    // @ts-ignore
    <TextField
      {...props}
      InputProps={{
        disableUnderline: true,
        ...inputProps,
      }}
    />
  );
};
