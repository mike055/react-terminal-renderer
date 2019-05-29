import React from 'react';
import chalk from 'chalk';
import {
  CTRL_C,
  ENTER,
  BACKSPACE,
  DELETE,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_DOWN,
  ARROW_UP,
} from '../constants/keys';
import InputContext from '../contexts/InputContext';

type OnChange = (val: string) => void;
type OnSubmit = (val: string) => void;

type InputProps = {
  onChange: OnChange;
  onSubmit: OnSubmit;
  value: string;
  focus: boolean;
};

type InternalInputProps = InputProps & InputContext;

type InternalInputState = {
  cursorOffset: number;
  cursorWidth: number;
};

class InternalInput extends React.Component<
  InternalInputProps,
  InternalInputState
> {
  state = {
    cursorOffset: (this.props.value || '').length,
    cursorWidth: 0,
  };

  handleInput = (data: any) => {
    const { onChange, onSubmit, value: originalValue, focus } = this.props;
    const { cursorOffset: originalCursorOffset } = this.state;
    const input = String(data);

    if (
      !focus ||
      input === CTRL_C ||
      input === ARROW_DOWN ||
      input === ARROW_UP
    ) {
      return;
    }

    if (input === ENTER) {
      onSubmit && onSubmit(originalValue);
      return;
    }

    let cursorOffset = originalCursorOffset;
    let value = originalValue;
    let cursorWidth = 0;

    if (input === ARROW_LEFT) {
      cursorOffset--;
    } else if (input === ARROW_RIGHT) {
      cursorOffset++;
    } else if (input === BACKSPACE || input === DELETE) {
      value =
        value.substr(0, cursorOffset - 1) +
        value.substr(cursorOffset, value.length);
      cursorOffset--;
    } else {
      value =
        value.substr(0, cursorOffset) +
        input +
        value.substr(cursorOffset, value.length);
      cursorOffset += input.length;

      if (input.length > 1) {
        cursorWidth = input.length;
      }
    }

    if (cursorOffset < 0) {
      cursorOffset = 0;
    }

    if (cursorOffset > value.length) {
      cursorOffset = value.length;
    }

    this.setState({ cursorOffset, cursorWidth });

    onChange && onChange(value);
  };

  componentDidMount() {
    const { inputStream, setRawMode } = this.props;

    inputStream && inputStream.on('data', this.handleInput);
    setRawMode && setRawMode(true);
  }

  componentWillUnmount() {
    const { inputStream, setRawMode } = this.props;

    inputStream && inputStream.removeListener('data', this.handleInput);
    setRawMode && setRawMode(false);
  }

  render() {
    const { value, focus } = this.props;
    const { cursorOffset, cursorWidth } = this.state;
    const hasValue = value.length > 0;
    let renderedValue = value;
    const cursorActualWidth = cursorWidth;

    if (focus) {
      renderedValue = hasValue ? '' : chalk.inverse(' ');

      let i = 0;
      for (const char of value) {
        if (i >= cursorOffset - cursorActualWidth && i <= cursorOffset) {
          renderedValue += chalk.inverse(char);
        } else {
          renderedValue += char;
        }

        i++;
      }

      if (hasValue && cursorOffset === value.length) {
        renderedValue += chalk.inverse(' ');
      }
    }

    return <span>{renderedValue}</span>;
  }
}

const Input = ({ onChange, onSubmit, value, focus }: InputProps) => {
  return (
    <InputContext.Consumer>
      {({ inputStream, setRawMode }) => (
        <InternalInput
          onChange={onChange}
          onSubmit={onSubmit}
          value={value}
          focus={focus}
          inputStream={inputStream as NodeJS.ReadStream}
          setRawMode={setRawMode}
        />
      )}
    </InputContext.Consumer>
  );
};

export default Input;
