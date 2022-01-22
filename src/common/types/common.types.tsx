import { ChangeEvent } from 'react';

export type Nullable<T> = T | null;

export type Id<T> = { id: T };
export type Title = { title: string };
export type CreatedDate = { createdDate: string };
export type UpdatedDate = { updatedDate: string };

export type NullableDate = {
  date: Date | null;
};

export type InputChangeEvent = ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;
