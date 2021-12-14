import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';

export type IPredefinedOption = {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  code: PREDEFINED_CODES;
};

export enum PREDEFINED_CODES {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW'
}
