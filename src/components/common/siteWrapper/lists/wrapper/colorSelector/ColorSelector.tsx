import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FC, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { PROJECT_COLORS } from '../../../../../../common/constants/constants';
import { Row } from '../../../../utilities/row/Row';
import { TextField } from '@mui/material';
import { Project } from '../../../../../../common/types/projects.types';

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

type Props = {
  color: Project['color'];
  setColor: (color: string) => void;
};

export const ColorSelector: FC<Props> = ({ setColor, color }) => {
  const classes = useStyles();

  const handleChange = (event: { target: { value: string } }) => {
    setColor(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <FormControl fullWidth>
        <TextField
          select
          size={'small'}
          value={color}
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
