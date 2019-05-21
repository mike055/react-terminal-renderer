import React from 'react';

type TextProps = {
  children: React.ReactNode;
};

export const Text = ({ children }: TextProps) => {
  return <span>{children}</span>;
};

export default Text;
