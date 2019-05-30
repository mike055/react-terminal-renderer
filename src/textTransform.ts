import chalk from 'chalk';
import { TextStyles } from './types';

const buildChalkTransform = (styles: TextStyles) => {
  let chalkStyles = chalk;

  if (styles.bold) {
    chalkStyles = chalkStyles.bold;
  }

  if (styles.color) {
    chalkStyles = chalkStyles.keyword(styles.color);
  }

  if (styles.backgroundColor) {
    chalkStyles = chalkStyles.bgKeyword(styles.backgroundColor);
  }

  return chalkStyles;
};

const ensureWidth = (text: string, width?: number) => {
  if (width) {
    return text.padEnd(width);
  }

  return text;
};

const addPaddingToText = (text: string, styles: TextStyles) => {
  let paddingLeft = '';
  let paddingRight = '';

  if (styles.paddingLeft) {
    paddingLeft = ' '.repeat(styles.paddingLeft);
  }

  if (styles.paddingRight) {
    paddingRight = ' '.repeat(styles.paddingRight);
  }

  return ensureWidth(`${paddingLeft}${text}${paddingRight}`, styles.width);
};

const textTransform = (text: string, styles?: TextStyles) => {
  if (styles) {
    const chalkStyles = buildChalkTransform(styles);
    return chalkStyles(addPaddingToText(text, styles));
  }
  return text;
};

export default textTransform;
