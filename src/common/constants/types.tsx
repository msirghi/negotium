import React from 'react';
import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';

export type MainMenuItem = {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  route: string;
};

export type ProjectColor = {
  name: string;
  color: string;
};

export type StaticProps = {
  locale: string;
};

export type SlateNode = {
  type: string;
  children: Array<{ text: string }>;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
}
