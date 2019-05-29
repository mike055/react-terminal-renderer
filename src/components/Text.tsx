import React from 'react';
import { TextStyles } from '../types';

type TextProps = {
  children: React.ReactNode;
  styles?: TextStyles;
};

export const Text = ({ children, styles }: TextProps) => {
  return <span data-styles={styles}>{children}</span>;
};

export default Text;
