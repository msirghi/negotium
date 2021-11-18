import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { PROJECT_COLORS } from '../../../../../../common/constants/constants';
import { Row } from '../../../../utilities/row/Row';
import { TextField } from '@mui/material';

const useStyles = makeStyles({
  root: {
    marginTop: 24,
  },
  colorCircle: {
    borderRadius: '50%',
    width: 10,
    height: 10,
  },
  colorName: {
    marginLeft: 10,
  },
});

export const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0].color);
  const classes = useStyles();

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedColor(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <FormControl fullWidth>
        <TextField
          select
          size={'small'}
          value={selectedColor}
          label="Color"
          onChange={handleChange}
        >
          {PROJECT_COLORS.map(({ color, name }) => {
            return (
              <MenuItem key={color} value={color}>
                <Row alignVerticalCenter>
                  <div
                    className={classes.colorCircle}
                    style={{ backgroundColor: color }}
                  />
                  <span className={classes.colorName}>{name}</span>
                </Row>
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>
    </Box>
  );
};
