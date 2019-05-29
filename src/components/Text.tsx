import React, { CSSProperties } from 'react';

type TextProps = {
  children: React.ReactNode;
  style?: CSSProperties;
};

export const Text = ({ children, style }: TextProps) => {
  return <span style={style}>{children}</span>;
};

export default Text;
