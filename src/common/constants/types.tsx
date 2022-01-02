import React, {ChangeEvent} from 'react';
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
  params: any;
};

export type SlateNode = {
  type: string;
  children: Array<{ text: string }>;
};

export type LoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};

export type AxiosRequestInstance = {
  response: {
    config: {
      headers: { [key: string]: string };
      url: string;
    };
  };
};

export type SiteTheme = {
  label: string;
  color: string;
  internalKey: string;
};

export type TextInputChangeEvent =  ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
