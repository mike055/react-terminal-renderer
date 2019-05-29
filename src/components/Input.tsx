import React from 'react';
import { CTRL_C, ENTER, BACKSPACE, DELETE } from '../constants/keys';
import InputContext from '../contexts/InputContext';

type OnChange = (val: string) => void;
type OnSubmit = (val: string) => void;

type InputProps = {
  onChange: OnChange;
  onSubmit: OnSubmit;
  originalValue: string;
  focus: boolean;
};

type InternalInputProps = InputProps & InputContext;

class InternalInput extends React.Component<InternalInputProps> {
  handleInput = (data: any) => {
    const { onChange, onSubmit, originalValue, focus } = this.props;

    const s = String(data);

    if (!focus) {
      return;
    }

    if (s == CTRL_C) {
      return;
    }

    if (s === ENTER) {
      onSubmit && onSubmit(originalValue);
      return;
    }

    let value = originalValue;

    if (s === BACKSPACE || s === DELETE) {
      value = value.substr(0, value.length - 1);
    } else {
      value += s;
    }

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
    return <span>{this.props.originalValue}</span>;
  }
}

const Input = ({ onChange, onSubmit, originalValue, focus }: InputProps) => {
  return (
    <InputContext.Consumer>
      {({ inputStream, setRawMode }) => (
        <InternalInput
          onChange={onChange}
          onSubmit={onSubmit}
          originalValue={originalValue}
          focus={focus}
          inputStream={inputStream as NodeJS.ReadStream}
          setRawMode={setRawMode}
        />
      )}
    </InputContext.Consumer>
  );
};

export default Input;
