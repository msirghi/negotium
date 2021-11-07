import React from 'react';
import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';

export type MainMenuItem = {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
};
