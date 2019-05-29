import React from 'react';
import readline from 'readline';
import InputContext from '../contexts/InputContext';
import { Options } from '../types';
import { CTRL_C } from '../constants/keys';

type AppProps = {
  children: React.ReactNode;
  options: Options;
};

class App extends React.Component<AppProps> {
  private rawModeEnabledCount: number;

  constructor(props: AppProps) {
    super(props);
    // Count how many components enabled raw mode to avoid disabling
    // raw mode until all components don't need it anymore
    this.rawModeEnabledCount = 0;
  }

  setRawMode = (enabled: boolean) => {
    const inputStream = this.props.options.input;

    if (inputStream === undefined) {
      return;
    }

    if (enabled) {
      // Ensure raw mode is enabled only once
      if (this.rawModeEnabledCount === 0) {
        inputStream.addListener('data', this.handleInput);
        inputStream.resume();
        inputStream.setRawMode && inputStream.setRawMode(true);
        readline.emitKeypressEvents(inputStream);
      }

      this.rawModeEnabledCount++;
      return;
    }

    if (--this.rawModeEnabledCount === 0) {
      inputStream.setRawMode && inputStream.setRawMode(false);
      inputStream.removeListener('data', this.handleInput);
      inputStream.pause();
    }
  };

  handleInput = (input: any) => {
    const strInput = String(input);

    if (strInput === CTRL_C) {
      this.setRawMode(false);
      process.exit();
    }
  };

  render() {
    return (
      <InputContext.Provider
        value={{
          inputStream: this.props.options.input,
          setRawMode: this.setRawMode,
        }}
      >
        {this.props.children}
      </InputContext.Provider>
    );
  }
}

export default App;
