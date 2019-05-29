import { createContext } from 'react';

type InputContext = {
  inputStream: NodeJS.ReadStream | undefined;
  setRawMode?: (enable: boolean) => void;
};

const InputContext = createContext<InputContext>({
  inputStream: undefined,
  setRawMode: undefined,
});

export default InputContext;
