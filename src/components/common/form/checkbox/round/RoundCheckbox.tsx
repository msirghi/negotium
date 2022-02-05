import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Checkbox, CheckboxProps } from '@mui/material';

const RoundCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleOutlineIcon />}
      {...props}
    />
  );
};

export default RoundCheckbox;
