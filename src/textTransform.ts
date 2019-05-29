import chalk from 'chalk';
import { TextStyles } from './types';

const buildChalkTransform = (styles: TextStyles) => {
  let chalkStyles = chalk;

  if (styles.bold) {
    chalkStyles = chalkStyles.bold;
  }

  return chalkStyles;
};

const textTransform = (text: string, styles?: TextStyles) => {
  if (styles) {
    const chalkStyles = buildChalkTransform(styles);
    return chalkStyles(text);
  }
  return text;
};

export default textTransform;
