import { ReactNode } from 'react';

export type iProduct = {
  id: number;
  name: string;
  salePrice: number;
  children?: ReactNode;
};
