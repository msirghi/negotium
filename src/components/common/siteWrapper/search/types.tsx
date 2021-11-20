import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';

export type HeaderSearchOptions = {
  id: string;
  title: string;
  onClick: Function;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
};
