import chalk from 'chalk';
import { CSSProperties } from 'react';

const buildChalkTransform = (style: CSSProperties) => {
  let chalkStyles = chalk;

  if (style.fontWeight && style.fontWeight === 'bold') {
    chalkStyles = chalkStyles.bold;
  }

  return chalkStyles;
};

const textTransform = (text: string, style?: CSSProperties) => {
  if (style) {
    const chalkStyles = buildChalkTransform(style);
    return chalkStyles(text);
  }
  return text;
};

export default textTransform;
