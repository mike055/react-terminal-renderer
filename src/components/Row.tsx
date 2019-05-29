import React from 'react';

type RowProps = {
  children: React.ReactNode;
};

export const Row = ({ children }: RowProps) => {
  return <div>{children}</div>;
};

export default Row;
