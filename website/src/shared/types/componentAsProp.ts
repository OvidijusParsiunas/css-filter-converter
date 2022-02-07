import { ReactChild } from 'react';

export type ComponentAsProp = ReactChild | null;

export type ComponentsAsProp = ComponentAsProp | ComponentAsProp[];
